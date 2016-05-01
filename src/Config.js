"use strict";

const Parser = require("./Parser");
const path = require("path");

class Config {

  /**
   * Constructor
   * @param  {Object|String} passedConfigParam Object or string with desired configuration
   */
  constructor(passedConfigParam) {
    if (this._isConfigPassed(passedConfigParam)) {
      let passedConfig = this._getPassedConfig(passedConfigParam);

      this.config = Object.assign({}, passedConfig);
    } else {
      this.defaultConfig = require("./defaultConfig");
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

    return typeof passedConfig !== "undefined" && Object.keys(passedConfig).length !== noKeysLength;
  }

  /**
   * Loads the config
   * @param  {Object|String} passedConfig  File path if string. Config object also accepted.
   * @return {Object}                         Config JSON
   */
  _getPassedConfig(passedConfig) {
    if (typeof passedConfig === "string") {
      let parser = new Parser();
      let configFile = passedConfig;

      if (!path.isAbsolute(passedConfig)) {
        configFile = path.join(__dirname, passedConfig);
      }

      return parser.parse(configFile);
    }

    return passedConfig;
  }

}

module.exports = Config;
