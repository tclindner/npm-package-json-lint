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
    this.firstKey = 0;
    this.secondKey = 1;

    if (this._isConfigPassed(passedConfigParam)) {
      const passedConfig = this._getPassedConfig(passedConfigParam);

      this.config = Object.assign({}, passedConfig);
    } else {
      this.defaultConfig = require('./defaultConfig');
      this.config = Object.assign({}, this.defaultConfig);
    }
  }

  /**
   * Gets the config
   * @return {Object} Config object
   */
  get() {
    return this.config;
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
        configFile = path.join(__dirname, passedConfig);
      }

      const rcFileObj = parser.parse(configFile);

      this._validateConfig(rcFileObj);

      return rcFileObj;
    }

    return passedConfig;
  }

  /**
   * Validates config file
   * @param  {Object}     rcFileObj   Object version of .npmpackagejsonlintrc file
   * @return {boolean}                True if validate config is successful
   */
  _validateConfig(rcFileObj) {
    for (const rule in rcFileObj) {
      const ruleConfig = rcFileObj[rule];

      if (Array.isArray(ruleConfig) && inArray(this.arrayRules, rule)) {
        if (typeof ruleConfig[this.firstKey] !== 'string' || typeof ruleConfig[this.firstKey] === 'string' && ruleConfig[this.firstKey] !== 'error' && ruleConfig[this.firstKey] !== 'warning') {
          throw new Error(`${rule} - first key must be set to "error" or "warning". Currently set to ${ruleConfig[this.firstKey]}`);
        }

        if (!Array.isArray(ruleConfig[this.secondKey])) {
          throw new Error(`${rule} - second key must be set an array. Currently set to ${ruleConfig[this.secondKey]}`);
        }
      } else if (typeof ruleConfig !== 'string' || typeof ruleConfig === 'string' && ruleConfig !== 'error' && ruleConfig !== 'warning') {
        throw new Error(`${rule} - must be set to "error" or "warning". Currently set to ${ruleConfig}`);
      }
    }

    return true;
  }

}

module.exports = Config;
