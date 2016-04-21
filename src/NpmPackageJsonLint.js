"use strict";

let chalk = require("chalk");
let Config = require("./Config");
let isPlainObj = require("is-plain-obj");
let Rules = require("./Rules");

class NpmPackageJsonLint {
  /**
   * constructor
   * @param  {object}           packageJsonData   Valid package.json data
   * @param  {object or string} passedConfigParam Object or string with desired configuration
   * @param  {object}           options           Object containing run options
   */
  constructor(packageJsonData, config, options) {
    this.packageJsonData = packageJsonData;
    this.ignoreWarnings = options.ignoreWarnings;
    this.errors = [];
    this.warnings = [];

    this.rules = new Rules();
    this._loadRules();

    this.config = this._getConfig(config);
  }

  /**
   * Main execution method for package json lint.
   * @return {object} Results object
   */
  lint() {
    for (let configItem in this.config) {
      let configItemValue = this.config[configItem];
      let ruleModule = this.rules.get(configItem);
      let arrayRuleTypes = ["valid-values", "invalid-dependencies", "invalid-pre-release-dependencies"];
      if (arrayRuleTypes.indexOf(ruleModule.ruleType) > -1) {
        let lintResult = ruleModule.lint(this.packageJsonData, configItemValue);
        this._processResult(lintResult, ruleModule.lintType);
      } else {
        // else all other rules either have a true or false flag if they are enabled
        if (configItemValue) {
          let lintResult = ruleModule.lint(this.packageJsonData);
          this._processResult(lintResult, ruleModule.lintType);
        }
      }
    }

    return this._getResultsObject();
  }

  /**
   * Private method for processing the result
   * @param {object or boolean} lintResult  Either true if no errors or a LintIssue object is invalid
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
   * @return {object} Results based on the run
   */
  _getResultsObject() {
    let result = {
      errors: this.errors
    };

    if (!this.ignoreWarnings) {
      result.warnings = this.warnings;
    }

    return result;
  }

  /**
   * Private method for loading rules
   */
  _loadRules() {
    this.rules.load();
  }

  /**
   * Private method for loading config
   * @param  {object or string} passedConfigParam Object or string with desired configuration
   * @return {object}           Configuration object for the run
   */
  _getConfig(config) {
    let configObj = new Config(config);
    return configObj.get();
  }
}

module.exports = NpmPackageJsonLint;
