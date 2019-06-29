/* eslint class-methods-use-this: 'off', max-statements: 'off', prefer-destructuring: 'off', guard-for-in: 'off', no-restricted-syntax: 'off' */

const Rules = require('./Rules');
const pkg = require('./../package.json');

class NpmPackageJsonLint {
  /**
   * constructor
   */
  constructor() {
    this.rules = new Rules();
    this.version = pkg.version;
    this.rules.load();
  }

  /**
   * Runs configured rules against the provided package.json object.
   *
   * @param  {Object}   packageJsonData   Valid package.json data
   * @param  {Object}   configObj         Configuration object
   * @return {Object}   Results object
   */
  lint(packageJsonData, configObj) {
    const lintIssues = [];

    for (const rule in configObj) {
      const ruleModule = this.rules.get(rule);
      let severity = 'off';
      let ruleConfig = {};

      if (ruleModule.ruleType === 'array' || ruleModule.ruleType === 'object') {
        severity = typeof configObj[rule] === 'string' && configObj[rule] === 'off' ? configObj[rule] : configObj[rule][0];
        ruleConfig = typeof configObj[rule] === 'string' ? {} : configObj[rule][1];
      } else if (ruleModule.ruleType === 'optionalObject') {
        if (typeof configObj[rule] === 'string') {
          severity = configObj[rule];
          ruleConfig = {};
        } else {
          severity = configObj[rule][0];
          ruleConfig = configObj[rule][1];
        }
      } else {
        severity = configObj[rule];
      }

      if (severity !== 'off') {
        const lintResult = ruleModule.lint(packageJsonData, severity, ruleConfig);

        if (typeof lintResult === 'object') {
          lintIssues.push(lintResult);
        }
      }
    }

    return {issues: lintIssues};
  }

  /**
   * Gets entire rule set
   *
   * @returns {Object} Rule set
   */
  getRules() {
    return this.rules.getRules();
  }

  /**
   * Get the rule definition for a given ruleId (name)
   *
   * @param {String} rule Rule name
   * @returns {Object} Rule object
   */
  getRule(rule) {
    return this.rules.get(rule);
  }
}

module.exports = NpmPackageJsonLint;
