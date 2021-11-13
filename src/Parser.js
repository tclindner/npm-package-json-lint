/* eslint class-methods-use-this: 'off', global-require: 'off', import/no-dynamic-require: 'off' */

const fs = require('fs');
const stripComments = require('strip-json-comments');

/**
 * Require JavaScript file
 *
 * @param  {String} fileName String file path of file to load
 * @return {Object}          Config object from file.
 * @throws {Error}           If the file cannot be read.
 */
const requireFile = (fileName) => require(fileName);

/**
 * Sychronously reads file from file system
 *
 * @param  {String} fileName String file path of file to load
 * @return {String}          File contents with BOM removed.
 * @throws {Error}           If the file cannot be read.
 */
const readFile = (fileName) => fs.readFileSync(fileName, 'utf8').replace(/^\uFEFF/, '');

/**
 * Helper method for throwing errors when file fails to load.
 *
 * @param {String} fileName Name of the file that failed to load.
 * @param {Object} err      Error object
 * @returns {Undefined} No return
 * @throws {Error}
 */
const handleError = (fileName, err) => {
  throw new Error(`Failed to read config file: ${fileName}. \nError: ${err.message}`);
};

/**
 * Public Parser class
 * @class
 */
const Parser = {
  /**
   * Parse a JSON file
   *
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   * @static
   */
  parseJsonFile(fileName) {
    let json = {};
    let fileContents = '';

    try {
      fileContents = readFile(fileName);

      json = JSON.parse(stripComments(fileContents));
    } catch (error) {
      handleError(fileName, error);
    }

    Object.defineProperty(json, Parser.sourceSymbol, {
      value: fileContents,
      enumerable: false,
      writable: false,
      configurable: false,
    });

    return json;
  },

  /**
   * Parse a JavaScript file
   *
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   * @static
   */
  parseJavaScriptFile(fileName) {
    let obj = {};

    try {
      obj = requireFile(fileName);
    } catch (error) {
      handleError(fileName, error);
    }

    return obj;
  },
};

Parser.sourceSymbol = Symbol('JSON source');

module.exports = Parser;
