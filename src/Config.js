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

const noRules = 0;

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
  //   ../ is npm-package-json-lint
  //   ../ is node_modules directory
  //   ../ is module referencing npm-package-json-lint
  return path.resolve(__dirname, '../../../');
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
      const userHomeDir = os.homedir();
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
    let config = ConfigFile.createEmptyConfig();

    const directory = filePath ? path.dirname(filePath) : this.options.cwd;

    if (directory === getProjectDir() || isPathInside(directory, getProjectDir())) {
      const pkgJsonFilePath = path.join(directory, 'package.json');
      const jsonRcFilePath = path.join(directory, ConfigFileType.rcFileName);
      const javaScriptConfigFilePath = path.join(directory, ConfigFileType.javaScriptConfigFileName);

      if (fs.existsSync(pkgJsonFilePath) && fs.statSync(pkgJsonFilePath).isFile()) {
        config = ConfigFile.loadFromPackageJson(pkgJsonFilePath, this);
      }

      if (this.useConfigFiles && Object.keys(config.rules).length === noRules && fs.existsSync(jsonRcFilePath) && fs.statSync(jsonRcFilePath).isFile()) {
        config = ConfigFile.load(jsonRcFilePath, this);
      } else if (this.useConfigFiles && Object.keys(config.rules).length === noRules && fs.existsSync(javaScriptConfigFilePath) && fs.statSync(javaScriptConfigFilePath).isFile()) {
        config = ConfigFile.load(javaScriptConfigFilePath, this);
      }

      if (!config.hasOwnProperty('root') || !config.root) {
        const parentPackageJsonFile = path.resolve(directory, '../', 'package.json');
        const parentConfig = this.getProjectHierarchyConfig(parentPackageJsonFile);

        // Merge base object
        const mergedConfig = Object.assign({}, parentConfig, config);

        // Merge rules
        const rules = Object.assign({}, parentConfig.rules, config.rules);

        // Override merged rules
        mergedConfig.rules = rules;

        config = mergedConfig;
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

    // Step 1: Get project hierarchy config from
    // package.json property, .npmpackagejsonlintrc.json, and npmpackagejsonlint.config.js files
    const projectHierarchyConfig = this.getProjectHierarchyConfig(filePath);

    // Step 2: Load cli specified config
    const cliSpecifiedCfgFileConfig = this.loadCliSpecifiedCfgFile(this.options.configFile);

    // Step 3: Merge config
    // NOTE: Object.assign does a shallow copy of objects, so we need to
    // do this for all of it properties then create a new final object

    const finalRules = Object.assign({}, projectHierarchyConfig.rules, cliSpecifiedCfgFileConfig.rules, this.cliConfig);

    finalConfig = {rules: finalRules};

    // Step 4: Check if any config has been found.
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

    // Step 5: return final config
    return finalConfig;
  }

}

module.exports = Config;
