import {cosmiconfigSync} from 'cosmiconfig';
import {validateRules} from './config/ConfigValidator';
import {transform} from './config/cosmicConfigTransformer';
import {applyExtendsIfSpecified} from './config/applyExtendsIfSpecified';
import {applyOverrides} from './config/applyOverrides';
import {Rules} from './native-rules';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('npm-package-json-lint:Config');

const noRules = 0;

/**
 * Config class
 * @class
 */
export class Config {
  /**
   * The user passed config object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;

  /**
   * The current working directory.
   */
  cwd: string;

  /**
   * The user passed configFile path.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configFile: any;

  /**
   * The base directory that config should be pulled from.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configBaseDirectory: any;

  /**
   * Rules object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(cwd: string, config: any, configFile: any, configBaseDirectory: any, rules: Rules) {
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
   * @param filePath File path of the file being linted.
   * @returns {Object} A config object.
   * @memberof Config
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getConfigForFile(filePath: string) {
    debug(`Getting config for ${filePath}`);
    const filePathToSearch = filePath;

    debug(`filePathToSearch: ${filePathToSearch}`);
    let config;

    if (typeof this.config === 'undefined') {
      debug(`User passed config is undefined.`);
      if (this.configFile) {
        debug(`Config file specified, loading it.`);
        config = cosmiconfigSync('npmpackagejsonlint', {
          transform: transform(this.cwd, this.configBaseDirectory, this.configFile),
        }).load(this.configFile);
      } else {
        debug(`Config file wasn't specified, searching for config.`);
        config = cosmiconfigSync('npmpackagejsonlint', {
          transform: transform(this.cwd, this.configBaseDirectory, filePathToSearch),
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

    validateRules(config, 'cli', this.rules);

    return config;
  }
}
