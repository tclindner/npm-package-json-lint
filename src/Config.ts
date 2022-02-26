const debug = require('debug')('npm-package-json-lint:Config');
import {cosmiconfigSync} from 'cosmiconfig';
import {configValidator} from './config/ConfigValidator';
import {cosmicConfigTransformer} from './config/cosmicConfigTransformer';
import {applyExtendsIfSpecified} from './config/applyExtendsIfSpecified';
import {applyOverrides} from './config/applyOverrides';

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
        config = cosmiconfigSync('npmpackagejsonlint', {
          transform: cosmicConfigTransformer.transform(this.cwd, this.configBaseDirectory, this.configFile),
        }).load(this.configFile);
      } else {
        debug(`Config file wasn't specified, searching for config.`);
        config = cosmiconfigSync('npmpackagejsonlint', {
          transform: cosmicConfigTransformer.transform(this.cwd, this.configBaseDirectory, filePathToSearch),
        }).search(filePathToSearch);
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
    debug('Final Config');
    debug(config);

    configValidator.validateRules(config, 'cli', this.rules);

    return config;
  }
}

module.exports = Config;
