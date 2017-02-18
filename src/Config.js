'use strict';

const inArray = require('in-array');
const isPlainObj = require('is-plain-obj');
const Parser = require('./Parser');
const path = require('path');

class Config {

  /**
   * Constructor
   * @param  {Object|String} passedConfigParam Object or string with desired configuration
   */
  constructor(passedConfigParam) {
    this.arrayRules = [
      'valid-values-author',
      'valid-values-private',
      'no-restricted-dependencies',
      'no-restricted-devDependencies',
      'no-restricted-pre-release-dependencies',
      'no-restricted-pre-release-devDependencies'
    ];

    this.passedConfigParam = passedConfigParam;
  }

  /**
   * Gets the config
   * @return {Object} Config object
   */
  get() {
    if (this._isConfigPassed(this.passedConfigParam)) {
      const passedConfig = this._getPassedConfig(this.passedConfigParam);
      let extendsConfig = {};

      if (passedConfig.hasOwnProperty('extends')) {
        extendsConfig = this._getExtendsConfig(passedConfig.extends);
      }

      return Object.assign({}, extendsConfig, passedConfig.rules);
    } else {
      throw new Error('No configuration passed');
    }
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

      const rcFileObj = parser.parse(configFile);

      this._validateConfig(rcFileObj);

      return rcFileObj;
    }

    return passedConfig;
  }

  /**
   * Gets configuration from a extends config module
   * @param  {String} moduleName  Name of the configuration module
   * @return {Object}             Configuration object
   */
  _getExtendsConfig(moduleName) {
    const configObj = this._getExtendsConfigModule(moduleName);

    this._validateConfig(configObj);

    return configObj.rules;
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
   * Validates config object
   * @param  {Object} rcFileObj   Object version of .npmpackagejsonlintrc file
   * @return {boolean}            True if validate config is successful
   */
  _validateConfig(rcFileObj) {
    if (rcFileObj.hasOwnProperty('rules')) {
      this._validateRulesConfig(rcFileObj.rules);
    } else {
      throw new Error('`rules` object missing in config');
    }

    return true;
  }

  /**
   * Validates rules object
   * @param  {Object}     rulesObj   Object version of .npmpackagejsonlintrc file
   * @return {boolean}               True if validate config is successful
   */
  _validateRulesConfig(rulesObj) {
    for (const rule in rulesObj) {
      const ruleConfig = rulesObj[rule];

      if (Array.isArray(ruleConfig) && inArray(this.arrayRules, rule)) {
        if (typeof ruleConfig[0] !== 'string' || this._isRuleValid(ruleConfig[0])) {
          throw new Error(`${rule} - first key must be set to "error", "warning", or "off". Currently set to ${ruleConfig[0]}`);
        }

        if (!Array.isArray(ruleConfig[1])) {
          throw new Error(`${rule} - second key must be set an array. Currently set to ${ruleConfig[1]}`);
        }
      } else if (typeof ruleConfig !== 'string' || this._isRuleValid(ruleConfig)) {
        throw new Error(`${rule} - must be set to "error", "warning", or "off". Currently set to ${ruleConfig}`);
      }
    }

    return true;
  }

  /**
   * Validates the first key of an array type rule
   * @param  {String}  key Error type of the rule
   * @return {Boolean}     True if the rule is valid. False if the rule is invalid.
   */
  _isRuleValid(key) {
    return typeof key === 'string' && key !== 'error' && key !== 'warning' && key !== 'off';
  }

}

module.exports = Config;
