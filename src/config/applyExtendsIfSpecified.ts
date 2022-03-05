import path from 'path';
import {parseJavaScriptFile, parseJsonFile} from '../file-parser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('npm-package-json-lint:applyExtendsIfSpecified');

/**
 * Applies values from the 'extends' field in a configuration file.
 *
 * @param {Object} config         The configuration information.
 * @param {string} parentName     Name of parent. For troubleshooting.
 * @param {Object} originalFilePath Base config file the extends originated from
 * @returns {Object} A new configuration object with all of the 'extends' fields loaded and merged.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const applyExtends = (config: any, parentName: any, originalFilePath: any): any => {
  let configExtends = config.extends;

  if (!Array.isArray(config.extends)) {
    configExtends = [config.extends];
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return configExtends.reduceRight((previousConfig, moduleName) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const extendsConfig = loadFromModule(moduleName, originalFilePath);

      // Merge base object
      const mergedConfig = {...extendsConfig, ...previousConfig};

      // Merge rules
      const rules = {...extendsConfig.rules, ...previousConfig.rules};

      // Merge plugins, if exist
      const extendsConfigPlugins = Array.isArray(extendsConfig.plugins) ? extendsConfig.plugins : [];
      const previousConfigPlugins = Array.isArray(previousConfig.plugins) ? previousConfig.plugins : [];
      const plugins = [...extendsConfigPlugins, ...previousConfigPlugins];
      const uniquePlugins = [...new Set(plugins)];

      // Merge overrides, if exist
      const extendsConfigOverrides = Array.isArray(extendsConfig.overrides) ? extendsConfig.overrides : [];
      const previousConfigOverrides = Array.isArray(previousConfig.overrides) ? previousConfig.overrides : [];
      const overrides = [...extendsConfigOverrides, ...previousConfigOverrides];

      // Override merged rules
      mergedConfig.rules = rules;

      if (plugins.length > 0) {
        mergedConfig.plugins = uniquePlugins;
      }

      if (overrides.length > 0) {
        mergedConfig.overrides = overrides;
      }

      return mergedConfig;
    } catch (error) {
      error.message += `\nReferenced from: ${parentName}`;
      throw error;
    }
  }, config);
};

/**
 * Gets configuration from a extends config module
 *
 * @param  {String} moduleName       Name of the configuration module
 * @param  {Object} originalFilePath Base config file the extends originated from
 * @return {Object}                  Configuration object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadFromModule = (moduleName: any, originalFilePath: any): any => {
  let config = {};
  let adjustedModuleName = moduleName;

  if (moduleName.startsWith('./')) {
    // TODO: handle process.cwd() option
    adjustedModuleName = path.join(process.cwd(), moduleName);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    config = loadConfigFile(adjustedModuleName);
  } else {
    const resolvedModule = require.resolve(adjustedModuleName, {paths: [path.dirname(originalFilePath)]});

    // eslint-disable-next-line import/no-dynamic-require, global-require
    config = require(resolvedModule);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (Object.keys(config).length > 0 && config.extends) {
    config = applyExtends(config, adjustedModuleName, originalFilePath);
  }

  return config;
};

/**
 * Loads a configuration file regardless of the source. Inspects the file path
 * to determine the correctly way to load the config file.
 *
 * @param {Object} filePath The path to the configuration.
 * @returns {Object} The configuration information.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadConfigFile = (filePath: any): any => {
  let config = {};

  switch (path.extname(filePath)) {
    case '.js':
      config = parseJavaScriptFile(filePath);
      break;

    case '.json':
      config = parseJsonFile(filePath);
      break;

    default:
      throw new Error(`Unsupport config file extension. File path: ${filePath}`);
  }

  return config;
};

/**
 * Loads a configuration file from the given file path.
 *
 * @param {Object} npmPackageJsonLintConfig Parsed config from cosmicconfig
 * @param {string} filepath the path to the config file
 * @returns {Object} the parsed config object (empty object if there was a parse error)
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyExtendsIfSpecified = (npmPackageJsonLintConfig: any, filepath: any): any => {
  let config = {...npmPackageJsonLintConfig};

  debug('Loading extends, if applicable');
  if (config?.hasOwnProperty('extends') && config.extends) {
    debug('extends property present, applying.');
    config = applyExtends(config, filepath, filepath);
  }

  debug('Loading extends complete');

  return config;
};
