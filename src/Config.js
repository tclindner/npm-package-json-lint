const debug = require('debug')('npm-package-json-lint:Config');
const cosmiconfig = require('cosmiconfig');

const configValidator = require('./config/configValidator');
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
   * @param {Object} rules      Rules object
   */
  constructor(cwd, config, configFile, configBaseDirectory, rules) {
    if (config) {
      this.config = applyExtendsIfSpecified(config, 'PassedConfig');
    }

    this.cwd = cwd;
    this.configFile = configFile;
    this.configBaseDirectory = configBaseDirectory;
    this.rules = rules;
    this.explorer = cosmiconfig('npmpackagejsonlint', {
      transform: cosmicConfigTransformer.transform(cwd, configBaseDirectory)
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
    const filePathToSearch = filePath;

    debug(`filePathToSearch: ${filePathToSearch}`);
    let config;

    if (typeof this.config === 'undefined') {
      debug(`User passed config is undefined.`);
      if (this.configFile) {
        debug(`Config file specified, loading it.`);
        config = this.explorer.loadSync(this.configFile);
      } else {
        debug(`Config file wasn't specified, searching for config.`);
        config = this.explorer.searchSync(filePathToSearch);
      }
    } else {
      debug(`User passed config is set, using it.`);
      const configBeforeOverrides = this.config;

      debug(`Applying overrides to config for ${filePath}`);
      config = applyOverrides(this.cwd, filePath, configBeforeOverrides.rules, configBeforeOverrides.overrides);

      debug(`Overrides applied for ${filePath}`);
    }

    if (!config) {
      throw new Error(`No npm-package-json-lint configuration found.\n${filePathToSearch}`);
    }

    if (Object.keys(config).length === noRules) {
      throw new Error(`No rules specified in configuration.\n${filePathToSearch}`);
    }

    debug(`Overrides applied for ${filePath}`);

    configValidator.validateRules(config, 'cli', this.rules);

    return config;
  }
}

module.exports = Config;
