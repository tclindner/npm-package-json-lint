'use strict';

/* eslint class-methods-use-this: 'off' */

const fs = require('fs');
const Parser = require('./Parser');
const path = require('path');
const userHome = require('user-home');

class Config {

  /**
   * Constructor
   * @param  {Object|String} passedConfigParam Object or string with desired configuration
   * @param  {Object}        packageJsonData   User's package.json data
   */
  constructor(passedConfigParam, packageJsonData) {
    this.arrayRules = [
      'valid-values-author',
      'valid-values-private',
      'valid-values-license',
      'no-restricted-dependencies',
      'no-restricted-devDependencies',
      'no-restricted-pre-release-dependencies',
      'no-restricted-pre-release-devDependencies',
      'prefer-property-order'
    ];

    this.passedConfigParam = passedConfigParam;
    this.packageJsonData = packageJsonData;
    this.rcFileName = '.npmpackagejsonlintrc';
    this.configFileName = 'npmpackagejsonlint.config.js';
  }

  /**
   * Gets the config
   * @return {Object} Config object
   */
  get() {
    const userConfig = this._getUserConfig();

    let extendsConfig = {};

    if (userConfig.hasOwnProperty('extends')) {
      extendsConfig = this._getExtendsConfig(userConfig.extends);
    }

    if (!userConfig.hasOwnProperty('rules')) {
      return Object.assign({}, extendsConfig);
    }

    return Object.assign({}, extendsConfig, userConfig.rules);
  }

  /**
   * Get users config with multiple fallbacks
   *
   * @returns {Object} Users config
   */
  _getUserConfig() {
    if (this._isConfigPassed(this.passedConfigParam)) {
      return this._getPassedConfig(this.passedConfigParam);
    } else if (this.packageJsonData.hasOwnProperty('npmPackageJsonLintConfig')) {
      return this.packageJsonData.npmPackageJsonLintConfig;
    } else if (this._isConfigFileExist(this._getRelativeConfigFilePth(this.rcFileName))) {
      return this._loadRcFile(this._getRelativeConfigFilePth(this.rcFileName));
    } else if (this._isConfigFileExist(this._getRelativeConfigFilePth(this.configFileName))) {
      return this._loadConfigFile(this._getRelativeConfigFilePth(this.configFileName));
    } else if (this._isConfigFileExist(this._getUsrHmConfigFilePath(this.rcFileName))) {
      return this._loadRcFile(this._getUsrHmConfigFilePath(this.rcFileName));
    } else if (this._isConfigFileExist(this._getUsrHmConfigFilePath(this.configFileName))) {
      return this._loadConfigFile(this._getUsrHmConfigFilePath(this.configFileName));
    }

    throw new Error('No configuration found');
  }

  /**
   * Checks whether config has been passed or not
   * @param  {Object|String}  passedConfig    Object or string with desired configuration
   * @return {Boolean}                        True if config is present, false if it isn't
   */
  _isConfigPassed(passedConfig) {
    const noKeysLength = 0;

    return typeof passedConfig !== 'undefined' && Object.keys(passedConfig).length !== noKeysLength;
  }

  /**
   * Loads the config
   * @param  {Object|String} passedConfig  File path if string. Config object also accepted.
   * @return {Object}                         Config JSON
   */
  _getPassedConfig(passedConfig) {
    if (typeof passedConfig === 'string') {
      const parser = new Parser();
      let configFile = passedConfig;

      if (!path.isAbsolute(passedConfig)) {
        configFile = path.join(process.cwd(), passedConfig);
      }

      return parser.parse(configFile);
    }

    return passedConfig;
  }

  /**
   * Gets configuration from a extends config module
   * @param  {String} moduleName  Name of the configuration module
   * @return {Object}             Configuration object
   */
  _getExtendsConfig(moduleName) {
    let adjustedModuleName;

    if (moduleName.startsWith('./')) {
      adjustedModuleName = path.join(process.cwd(), moduleName);
    } else {
      adjustedModuleName = moduleName;
    }

    const configObj = this._getExtendsConfigModule(adjustedModuleName);

    return configObj.rules;
  }

  /**
   * Gets relative config file path
   *
   * @param  {String}  fileName Name of the file
   * @return {String}  File path of the config file
   */
  _getRelativeConfigFilePth(fileName) {
    return path.join(process.cwd(), fileName);
  }

  /**
   * Gets userhome directory config file path
   *
   * @param  {String}  fileName Name of the file
   * @return {String}  File path of the config file
   */
  _getUsrHmConfigFilePath(fileName) {
    return path.join(userHome, fileName);
  }

  /**
   * Checks if a .npmpackagejsonlintrc.json file exists
   *
   * @param  {String}  filePath Path of the file
   * @return {Boolean} true if it exists, false if not
   */
  _isConfigFileExist(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Gets configuration from a extends config module
   * @param  {String} filePath  File path of config file
   * @return {Object}           Configuration object
   */
  _loadRcFile(filePath) {
    const parser = new Parser();

    return parser.parse(filePath);
  }

  /**
   * Checks if a .npmpackagejsonlintrc.json file exists
   *
   * @param  {String}  filePath File path of config file
   * @return {Boolean} true if it exists, false if not
   */
  _loadConfigFile(filePath) {
    return require(filePath);
  }

  /**
   * Loads extends config module
   * @param  {String} moduleName  Name of the configuration module
   * @return {Object}             Configuration object
   */
  _getExtendsConfigModule(moduleName) {
    /* istanbul ignore next */
    return require(moduleName);
  }

  /**
   * Validates array rule config
   * @param  {String}    ruleName    Name of the rule
   * @param  {Array}     ruleConfig  Array rule
   * @return {Boolean}               True if config is valid, false if not
   * @static
   */
  static isArrayRuleConfigValid(ruleName, ruleConfig) {
    if (typeof ruleConfig === 'string' && ruleConfig === 'off') {
      return true;
    } else if (typeof ruleConfig === 'string' && ruleConfig !== 'off') {
      throw new Error(`${ruleName} - is an array type rule. It must be set to "off" if an array is not supplied.`);
    } else if (typeof ruleConfig[0] !== 'string' || this._isSeverityInvalid(ruleConfig[0])) {
      throw new Error(`${ruleName} - first key must be set to "error", "warning", or "off". Currently set to "${ruleConfig[0]}".`);
    }

    if (!Array.isArray(ruleConfig[1])) {
      throw new Error(`${ruleName} - second key must be set an array. Currently set to "${ruleConfig[1]}".`);
    }

    return true;
  }

  /**
   * Validates standard rule config
   * @param  {String}     ruleName     Name of the rule
   * @param  {Object}     ruleConfig   Value for standard rule config
   * @return {Boolean}                 True if config is valid, false if not
   * @static
   */
  static isStandardRuleConfigValid(ruleName, ruleConfig) {
    if (this._isSeverityInvalid(ruleConfig)) {
      throw new Error(`${ruleName} - must be set to "error", "warning", or "off". Currently set to "${ruleConfig}".`);
    }

    return true;
  }

  /**
   * Validates if the severity config is set correctly
   * @param  {String}  severity Severity the rule is set to
   * @return {Boolean}          True if the severity is valid. False if the severity is invalid.
   * @static
   */
  static _isSeverityInvalid(severity) {
    return typeof severity !== 'string' || (typeof severity === 'string' && severity !== 'error' && severity !== 'warning' && severity !== 'off');
  }

}

module.exports = Config;
