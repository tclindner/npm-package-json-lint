'use strict';

const chalk = require('chalk');
const Config = require('./Config');
const inArray = require('in-array');
const isPlainObj = require('is-plain-obj');
const Rules = require('./Rules');

class NpmPackageJsonLint {

  /**
   * constructor
   * @param  {Object}           packageJsonData   Valid package.json data
   * @param  {Object|String}    config            Object or string with desired configuration
   * @param  {Object}           options           Object containing run options
   */
  constructor(packageJsonData, config, options) {
    this.packageJsonData = packageJsonData;
    this.ignoreWarnings = options.ignoreWarnings;
    this.arrayRuleTypes = ['valid-values', 'no-restricted-dependencies', 'no-restricted-pre-release-dependencies'];
    this.errors = [];
    this.warnings = [];

    this.rules = new Rules();
    this.rules.load();
    this.config = config;
  }

  /**
   * Main execution method for package json lint.
   * @return {Object} Results object
   */
  lint() {
    const configObj = this._getConfig(this.config);

    for (const rule in configObj) {
      const ruleModule = this.rules.get(rule);

      if (inArray(this.arrayRuleTypes, ruleModule.ruleType)) {
        const errorWarningOffSetting = configObj[rule][0];
        const ruleConfigArray = configObj[rule][1];

        if (errorWarningOffSetting !== 'off') {
          this._processResult(ruleModule.lint(this.packageJsonData, errorWarningOffSetting, ruleConfigArray), errorWarningOffSetting);
        }

      } else {
        const errorWarningOffSetting = configObj[rule];

        if (errorWarningOffSetting !== 'off') {
          this._processResult(ruleModule.lint(this.packageJsonData, errorWarningOffSetting), errorWarningOffSetting);
        }
      }
    }

    return this._getResultsObject();
  }

  /**
   * Private method for processing the result
   * @param   {Object|Boolean} lintResult  Either true if no errors or a LintIssue object is invalid
   * @param   {String}         lintType    Error or warning for issue type
   * @return  {undefined}                  No return
   */
  _processResult(lintResult, lintType) {
    if (typeof lintResult !== 'boolean') {
      if (lintType === 'error') {
        this.errors.push(lintResult);
      } else {
        this.warnings.push(lintResult);
      }
    }
  }

  /**
   * Private method for getting the results object
   * @return {Object} Results based on the run
   */
  _getResultsObject() {
    const result = {
      errors: this.errors
    };

    if (!this.ignoreWarnings) {
      result.warnings = this.warnings;
    }

    return result;
  }

  /**
   * Private method for loading config
   * @param  {Object|String} config   Object or string with desired configuration
   * @return {Object}                 Configuration object for the run
   */
  _getConfig(config) {
    const configObj = new Config(config);

    return configObj.get();
  }

}

module.exports = NpmPackageJsonLint;
