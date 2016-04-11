"use strict";

let fs = require("fs");
let path = require("path");

class Rules {
  /**
   * constructor
   */
  constructor() {
    this.rules = {};
  }

  /**
   * Loads rules
   * @return {object} Set of rules
   */
  load() {
    const rulesDirectory = path.join(__dirname, "rules");

    try {
      fs.readdirSync(rulesDirectory).forEach((file) => {
        this.rules[file.slice(0, -3)] = path.join(rulesDirectory, file);
      });

      return this.rules;
    } catch (e) {
      console.log("Error - " + e);
      return false;
    }
  }

  /**
   * Loads a rule
   * @param  {string} ruleId Name of the rule
   * @return {object}        Rule
   */
  get(ruleId) {
    return require(this.rules[ruleId]);
  }

  /**
   * Registers a rule in the rules object
   * @param  {string} ruleId     Name of the rule
   * @param  {string} ruleModule Path to rule
   */
  _registerRule(ruleId, ruleModule) {
    this.rules[ruleId] = ruleModule;
  }
}

module.exports = Rules;
