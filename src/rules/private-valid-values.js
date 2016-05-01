"use strict";

const LintIssue = require("./../LintIssue");
const isValidValue = require("./../validators/valid-values").isValidValue;
const lintId = "private-valid-values";
const lintType = "error";
const nodeName = "private";
const message = "Invalid value for private";
const ruleType = "valid-values";

/**
 * [function description]
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
const lint = function(packageJsonData, validValues) {
  if (!isValidValue(packageJsonData, nodeName, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
