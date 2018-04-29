'use strict';

const rcFileName = '.npmpackagejsonlintrc.json';
const javaScriptConfigFileName = 'npmpackagejsonlint.config.js';

/**
 * Public ConfigFileType class
 * @class
 */
class ConfigFileType {

  /**
   * Get rc file name
   *
   * @returns {String} rc file name
   * @static
   */
  static get rcFileName() {
    return rcFileName;
  }

  /**
   * Get JavaScript config file name
   *
   * @returns {String} JavaScript config file name
   * @static
   */
  static get javaScriptConfigFileName() {
    return javaScriptConfigFileName;
  }

}

module.exports = ConfigFileType;
