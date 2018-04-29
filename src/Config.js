'use strict';

/* eslint class-methods-use-this: 'off' */

const fs = require('fs');
const path = require('path');
const os = require('os');
const isPathInside = require('is-path-inside');
const isResolvable = require('is-resolvable');

const ConfigFile = require('./config/ConfigFile');
const ConfigFileType = require('./config/ConfigFileType');
const ConfigValidator = require('./config/ConfigValidator');

const userHomeDir = os.homedir();

/**
 * Determines the base directory for node packages referenced in a config file.
 * This does not include node_modules in the path so it can be used for all
 * references relative to a config file.
 *
 * @returns {String} The base directory for the file path.
 * @private
 */
const getProjectDir = function() {

  // calculates the path of the project including npm-package-json-lint as a dependency
  // NOTE: config-file is located in /src/
  //       ../ is npm-package-json-lint
  //       ../ is module referencing npm-package-json-lint
  return path.resolve(__dirname, '../../');
};

/**
 * Public Config class
 * @class
 */
class Config {

  /**
   * Constructor
   * @param  {Object} providedOptions Options object
   * @param  {Object} linter          Instance of npm-package-json-lint linter
   */
  constructor(providedOptions, linter) {
    const options = providedOptions || {};

    this.linterContext = linter;
    this.options = options;
    this.useConfigFiles = options.useConfigFiles;

    this.cliConfig = this.options.rules;

    ConfigValidator.validateRules(this.cliConfig, 'cli', this.linterContext);
  }

  /**
   * Loads configuration from current package.json file.
   *
   * @param {String}    filePath    The file to load.
   * @returns {Object}  The configuration object from the file.
   * @throws {Error}    If the file cannot be read.
   * @private
   */
  getConfigFromPkgJsonProp(filePath) {
    return ConfigFile.loadFromPackageJson(filePath, this);
  }

  /**
   * Loads the config options from a config specified on the command line.
   *
   * @param {String} config A shareable named config or path to a config file.
   * @returns {undefined} No return
   */
  loadCliSpecifiedCfgFile(config) {
    let configObj = ConfigFile.createEmptyConfig();
    const firstChar = 0;

    if (config) {
      const resolvable = isResolvable(config) || config.charAt(firstChar) === '@';
      const filePath = resolvable ? config : path.resolve(this.options.cwd, config);

      configObj = ConfigFile.load(filePath, this);
    }

    return configObj;
  }

  /**
   * Gets the personal config object from user's home directory.
   *
   * @returns {Object} the personal config object (null if there is no personal config)
   * @private
   */
  getUserHomeConfig() {
    if (typeof this.personalConfig === 'undefined') {
      let configObj = {};

      const jsonRcFilePath = path.join(userHomeDir, ConfigFileType.rcFileName);
      const javaScriptConfigFilePath = path.join(userHomeDir, ConfigFileType.javaScriptConfigFileName);

      if (fs.existsSync(jsonRcFilePath) && fs.statSync(jsonRcFilePath).isFile()) {
        configObj = ConfigFile.load(jsonRcFilePath, this);
      } else if (fs.existsSync(javaScriptConfigFilePath) && fs.statSync(javaScriptConfigFilePath).isFile()) {
        configObj = ConfigFile.load(javaScriptConfigFilePath, this);
      }

      this.personalConfig = configObj;
    }

    return this.personalConfig;
  }

  /* eslint-disable max-statements */
  /**
   * Finds local config files from the specified directory and its parent directories.
   *
   * @param {string} filePath a file in whose directory we start looking for a local config
   * @returns {Object} Config object
   */
  getProjectHierarchyConfig(filePath) {
    let config = {};

    const directory = filePath ? path.dirname(filePath) : this.options.cwd;

    if (directory === getProjectDir() || isPathInside(directory, getProjectDir())) {
      const jsonRcFilePath = path.join(directory, ConfigFileType.rcFileName);
      const javaScriptConfigFilePath = path.join(directory, ConfigFileType.javaScriptConfigFileName);

      if (fs.existsSync(jsonRcFilePath) && fs.statSync(jsonRcFilePath).isFile()) {
        const rcConfig = ConfigFile.load(jsonRcFilePath, this);

        config = Object.assign({}, rcConfig, config);
      } else if (fs.existsSync(javaScriptConfigFilePath) && fs.statSync(javaScriptConfigFilePath).isFile()) {
        const jsonConfig = ConfigFile.load(javaScriptConfigFilePath, this);

        config = Object.assign({}, jsonConfig, config);
      }

      if (!config.root) {
        const parentDir = path.join(directory, '../');

        config = Object.assign({}, this.getProjectHierarchyConfig(parentDir), config);
      }
    }

    return config;
  }

  /**
   * Get config object.
   * Order of precedence is:
   *   1. Config supplied in package.json file
   *   2. Config supplied in project hierarchy (files in current directory take precedence over parent directory)
   *   3. Config file supplied in CLI argument
   *   4. Direct rules supplied to CLI
   *
   * @param {string} filePath a file in whose directory we start looking for a local config
   * @returns {Object} config object
   */
  get(filePath) {
    let finalConfig = {};

    // Step 1: Get the package.json config object
    const packageConfig = this.getConfigFromPkgJsonProp(filePath);

    // Step 2: Get project hierarchy config from
    // .npmpackagejsonlintrc.json and npmpackagejsonlint.config.js files
    let projectHierarchyConfig = ConfigFile.createEmptyConfig();

    if (this.useConfigFiles) {
      projectHierarchyConfig = this.getProjectHierarchyConfig(filePath);
    }

    // Step 3: Load cli specified config
    const cliSpecifiedCfgFileConfig = this.loadCliSpecifiedCfgFile(this.options.configFile);

    // Step 4: Merge config
    // NOTE: Object.assign does a shallow copy of objects, so we need to
    // do this for all of it properties then create a new final object

    const finalRules = Object.assign({}, packageConfig.rules, projectHierarchyConfig.rules, cliSpecifiedCfgFileConfig.rules, this.cliConfig);

    finalConfig = {rules: finalRules};

    // Step 5: Check if any config has been found.
    // If no, try to load personal config from user home directory
    if (!Object.keys(finalConfig.rules).length) {
      const personalConfig = this.getUserHomeConfig();

      if (Object.keys(personalConfig).length) {
        finalConfig = Object.assign({}, personalConfig);
      } else {

        // No config found in all locations
        const relativeFilePath = `./${path.relative(this.options.cwd, filePath)}`;

        throw new Error(`No npm-package-json-lint configuration found.\n${relativeFilePath}`);
      }
    }

    // Step 6: return final config
    return finalConfig;
  }

}

module.exports = Config;
