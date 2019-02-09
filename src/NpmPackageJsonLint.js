/* eslint class-methods-use-this: 'off', max-statements: 'off', guard-for-in: 'off', no-restricted-syntax: 'off' */

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

      if (ruleModule.ruleType === 'array' || ruleModule.ruleType === 'object') {
        const severity = typeof configObj[rule] === 'string' && configObj[rule] === 'off' ? configObj[rule] : configObj[rule][0];
        const ruleConfig = configObj[rule][1];

        if (severity !== 'off') {
          const lintResult = ruleModule.lint(packageJsonData, severity, ruleConfig);

          if (typeof lintResult === 'object') {
            lintIssues.push(lintResult);
          }
        }
      } else {
        const severity = configObj[rule];

        if (severity !== 'off') {
          const lintResult = ruleModule.lint(packageJsonData, severity);

          if (typeof lintResult === 'object') {
            lintIssues.push(lintResult);
          }
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
