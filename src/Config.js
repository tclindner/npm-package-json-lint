const debug = require('debug')('npm-package-json-lint:Config');
const cosmiconfig = require('cosmiconfig');

// const ConfigValidator = require('./config/ConfigValidator');
const cosmicConfigTransformer = require('./config/cosmicConfigTransformer');
const applyExtendsIfSpecified = require('./config/applyExtendsIfSpecified');
const applyOverrides = require('./config/applyOverrides');

const noRules = 0;

/**
 * Config class
 * @class
 */
class Config {
  /**
   * Constructor
   *
   * @param {string} cwd        The current working directory.
   * @param {Object} config     The user passed config object.
   * @param {string} configFile The user passed configFile path.
   * @param {string} configBaseDirectory The base directory that config should be pulled from.
   */
  constructor(cwd, config, configFile, configBaseDirectory) {
    if (config) {
      this.config = applyExtendsIfSpecified(config, 'PassedConfig');
    }

    this.cwd = cwd;
    this.configFile = configFile;
    this.configBaseDirectory = configBaseDirectory;
    this.explorer = cosmiconfig('npmpackagejsonlint', {
      transform: cosmicConfigTransformer.transform(configBaseDirectory)
    });
  }

  /**
   * Gets the config for a file.
   *
   * @param {string} filePath File path of the file being linted.
   * @returns {Object} A config object.
   * @memberof Config
   */
  getConfigForFile(filePath) {
    debug(`Getting config for ${filePath}`);
    const filePathToSearch = filePath || this.cwd;

    debug(`filePathToSearch: ${filePathToSearch}`);
    let configBeforeOverrides;

    if (typeof this.config === 'undefined') {
      debug(`User passed config is undefined.`);
      if (this.configFile) {
        debug(`Config file specified, loading it.`);
        configBeforeOverrides = this.explorer.loadSync(this.configFile);
      } else {
        debug(`Config file wasn't specified, searching for config.`);
        configBeforeOverrides = this.explorer.searchSync(filePathToSearch);
      }
    } else {
      debug(`User passed config is set, using it.`);
      configBeforeOverrides = this.config;
    }

    if (!configBeforeOverrides) {
      throw new Error(`No configuration provided for ${filePathToSearch}`);
    }

    debug(configBeforeOverrides);
    if (!configBeforeOverrides.rules || configBeforeOverrides.rules.length === noRules) {
      throw new Error(`Configuration has no rules specified for ${filePathToSearch}`);
    }

    debug(`Applying overrides to config for ${filePath}`);
    const configWithOverrides = applyOverrides(
      this.cwd,
      filePath,
      configBeforeOverrides.rules,
      configBeforeOverrides.overrides
    );

    debug(`Overrides applied for ${filePath}`);

    // ConfigValidator.validate(configWithOverrides, '', rules);

    return configWithOverrides;
  }
}

module.exports = Config;
