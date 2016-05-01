"use strict";

const chalk = require("chalk");
const Config = require("./Config");
const inArray = require("in-array");
const isPlainObj = require("is-plain-obj");
const Rules = require("./Rules");

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
    this.arrayRuleTypes = ["valid-values", "invalid-dependencies", "invalid-pre-release-dependencies"];
    this.errors = [];
    this.warnings = [];

    this.rules = new Rules();
    this._loadRules();

    this.config = this._getConfig(config);
  }

  /**
   * Main execution method for package json lint.
   * @return {Object} Results object
   */
  lint() {
    for (const configItem in this.config) {
      const configItemValue = this.config[configItem];
      const ruleModule = this.rules.get(configItem);

      if (inArray(this.arrayRuleTypes, ruleModule.ruleType)) {
        const lintResult = ruleModule.lint(this.packageJsonData, configItemValue);

        this._processResult(lintResult, ruleModule.lintType);
      } else if (configItemValue) {
        // else all other rules either have a true or false flag if they are enabled
        const lintResult = ruleModule.lint(this.packageJsonData);

        this._processResult(lintResult, ruleModule.lintType);
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
    if (typeof lintResult !== "boolean") {
      if (lintType === "error") {
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
   * Private method for loading rules
   * @return {undefined}            No return
   */
  _loadRules() {
    this.rules.load();
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
