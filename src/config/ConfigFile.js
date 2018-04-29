'use strict';

const path = require('path');

const ConfigValidator = require('./ConfigValidator');
const Parser = require('./../Parser');

/**
 * Applies values from the 'extends' field in a configuration file.
 *
 * @param {Object} config         The configuration information.
 * @param {Config} configContext  Plugin context for the config instance
 * @param {String} parentName     Name of parent. For troubleshooting.
 * @param  {Object} originalFilePath Base config file the extends originated from
 * @returns {Object} A new configuration object with all of the 'extends' fields
 *      loaded and merged.
 * @private
 */
const applyExtends = function(config, configContext, parentName, originalFilePath) {
  let configExtends = config.extends;

  if (!Array.isArray(config.extends)) {
    configExtends = [config.extends];
  }

  return configExtends.reduceRight((previousConfig, moduleName) => {
    try {
      /* eslint-disable no-use-before-define */
      const extendsConfig = loadFromModule(moduleName, configContext, originalFilePath);

      // Merge base object
      const mergedConfig = Object.assign({}, extendsConfig, previousConfig);

      // Merge rules
      const rules = Object.assign({}, extendsConfig.rules, previousConfig.rules);

      // Override merged rules
      mergedConfig.rules = rules;

      return mergedConfig;
    } catch (err) {
      err.message += `\nReferenced from: ${parentName}`;
      throw err;
    }

  }, config);
};

/**
 * Gets configuration from a extends config module
 *
 * @param  {String} moduleName    Name of the configuration module
 * @param  {Object} configContext Plugin context for the config instance
 * @param  {Object} originalFilePath Base config file the extends originated from
 * @return {Object}               Configuration object
 * @private
 */
const loadFromModule = function(moduleName, configContext, originalFilePath) {
  let config = {};
  let adjustedModuleName = moduleName;

  if (moduleName.startsWith('./')) {
    adjustedModuleName = path.join(configContext.options.cwd, moduleName);
    config = loadConfigFile(adjustedModuleName);
  } else {
    const originalFileDir = path.dirname(originalFilePath);
    const resolvedModule = require.resolve(adjustedModuleName, {paths: originalFileDir});

    config = require(resolvedModule);
  }

  if (Object.keys(config).length) {
    ConfigValidator.validate(config, adjustedModuleName, configContext.linterContext);

    if (config.extends) {
      config = applyExtends(config, configContext, adjustedModuleName, originalFilePath);
    }
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
const loadConfigFile = function(filePath) {
  let config = {};

  switch (path.extname(filePath)) {
  case '.js':
    config = Parser.parseJavaScriptFile(filePath);
    break;

  case '.json':
    config = Parser.parseJsonFile(filePath);
    break;

  default:
    throw new Error(`Unsupport config file extension. File path: ${filePath}`);
    break;
  }

  return config;
};

/**
 * Loads a configuration file from the given file path.
 *
 * @param {Object} filePath The path of the config file.
 * @param {Config} configContext Plugins context
 * @returns {Object} The configuration information.
 */
const loadFromDisk = function(filePath, configContext) {
  let config = loadConfigFile(filePath);

  if (config) {
    ConfigValidator.validate(config, filePath, configContext.linterContext);

    if (config.extends) {
      config = applyExtends(config, configContext, filePath, filePath);
    }
  }

  return config;
};

/**
 * Public ConfigFile class
 * @class
 */
class ConfigFile {

  /**
   * Loads a config object from the config cache based on its filename, falling back to the disk if the file is not yet
   * cached.
   *
   * @param {string} filePath the path to the config file
   * @param {Config} configContext Context for the config instance
   * @returns {Object} the parsed config object (empty object if there was a parse error)
   * @private
   */
  static load(filePath, configContext) {
    return loadFromDisk(filePath, configContext);
  }

  /**
   * Loads configuration from current package.json file.
   *
   * @param {String}    filePath      The file to load.
   * @param {Config}    configContext Context for the config instance
   * @returns {Object}  The configuration object from the file.
   * @throws {Error}    If the file cannot be read.
   * @static
   */
  static loadFromPackageJson(filePath, configContext) {
    let config = Parser.parseJsonFile(filePath).npmPackageJsonLintConfig || ConfigFile.createEmptyConfig();

    if (config) {
      ConfigValidator.validate(config, filePath, configContext.linterContext);

      if (config.extends) {
        config = applyExtends(config, configContext, filePath, filePath);
      }
    }

    return config;
  }

  /**
   * Creates an empty config object
   *
   * @returns {Object} Basic config object
   */
  static createEmptyConfig() {
    return {rules: {}};
  }

}

module.exports = ConfigFile;
