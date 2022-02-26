import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export class Rules {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: any;

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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load() {
    const rulesDirectory = path.join(__dirname, 'rules');

    try {
      fs.readdirSync(rulesDirectory).forEach((file) => {
        const beginIndex = 0;
        const endIndex = -3;
        const ruleId = file.slice(beginIndex, endIndex);
        const ruleModule = path.join(rulesDirectory, file);

        // eslint-disable-next-line no-underscore-dangle
        this._registerRule(ruleId, ruleModule);
      });

      return this.rules;
    } catch (error) {
      throw new Error(`Error while loading rules from rules directory - ${error.message}`);
    }
  }

  /**
   * Loads a rule
   * @param  {String} ruleId Name of the rule
   * @return {Object}        Rule
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get(ruleId) {
    const rule = this.rules[ruleId];

    if (typeof rule === 'undefined') {
      const errorMsg = `Rule, ${ruleId}, is invalid. Please ensure it matches a valid option.`;

      throw new Error(chalk.bold.red(errorMsg));
    }

    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(this.rules[ruleId]);
  }

  /**
   * Gets entire rule set
   *
   * @returns {Object} Rule set
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getRules() {
    return this.rules;
  }

  /**
   * Registers a rule in the rules object
   * @param  {String}     ruleId      Name of the rule
   * @param  {String}     ruleModule  Path to rule
   * @return {undefined}              No return
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
  _registerRule(ruleId, ruleModule) {
    this.rules[ruleId] = ruleModule;
  }
}
