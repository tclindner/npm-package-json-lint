"use strict";

let fs = require("fs");

class Parser {
  /**
   * Parse a file
   * @param  {string} fileName String file path of file to load
   * @return {object}          Valid JavaScript object
   */
  parse(fileName) {
    // Make sure that a .npmpackagejsonlintrc is present
    try {
      return this._readFile(fileName);
    } catch (e) {
      throw new Error(`${fileName} does not exist :(`);
    }
  }

  /**
   * Sychronously reads file from file system
   * @param  {string} fileName String file path of file to load
   * @return {object}          Valid JavaScript object
   */
  _readFile(fileName) {
    let file = fs.readFileSync(fileName);
    return JSON.parse(file);
  }

}

module.exports = Parser;
