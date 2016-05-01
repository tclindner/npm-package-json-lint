"use strict";

const fs = require("fs");

class Parser {

  /**
   * Parse a file
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   */
  parse(fileName) {
    // Make sure that a .npmpackagejsonlintrc is present
    try {
      return this._readFile(fileName);
    } catch (err) {
      throw new Error(`${fileName} does not exist :(`);
    }
  }

  /**
   * Sychronously reads file from file system
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   */
  _readFile(fileName) {
    const file = fs.readFileSync(fileName);

    return JSON.parse(file);
  }

}

module.exports = Parser;
