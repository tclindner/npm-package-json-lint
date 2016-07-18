'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

class Rules {

  /**
   * Constructor
   */
  constructor() {
    this.rules = {};
  }

  /**
   * Loads rules
   * @return {Object} Set of rules
   */
  load() {
    const rulesDirectory = path.join(__dirname, 'rules');

    try {
      fs.readdirSync(rulesDirectory).forEach((file) => {
        const beginIndex = 0;
        const endIndex = -3;
        const ruleId = file.slice(beginIndex, endIndex);
        const ruleModule = path.join(rulesDirectory, file);

        this._registerRule(ruleId, ruleModule);
      });

      return this.rules;
    } catch (err) {
      console.log(`Error - ${err}`);

      return false;
    }
  }

  /**
   * Loads a rule
   * @param  {String} ruleId Name of the rule
   * @return {Object}        Rule
   */
  get(ruleId) {
    const rule = this.rules[ruleId];

    if (typeof rule === 'undefined') {
      const errorMsg = `Rule, ${ruleId}, is invalid. Please ensure it matches a valid option.`;

      throw new Error(chalk.bold.red(errorMsg));
    }

    return require(this.rules[ruleId]);
  }

  /**
   * Registers a rule in the rules object
   * @param  {String}     ruleId      Name of the rule
   * @param  {String}     ruleModule  Path to rule
   * @return {undefined}              No return
   */
  _registerRule(ruleId, ruleModule) {
    this.rules[ruleId] = ruleModule;
  }

}

module.exports = Rules;
