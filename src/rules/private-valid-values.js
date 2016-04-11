"use strict";

let LintIssue = require("./../LintIssue");
let isValidValue = require("./../validators/valid-values").isValidValue;
const lintId = "private-valid-values";
const lintType = "error";
const nodeName = "private";
const message = "Invalid value for private";
const ruleType = "valid-values";

/**
 * [function description]
 * @param  {object}   packageJsonData   Valid package.json object
 * @param  {array}    validValues       An array of valid values
 * @return {object or boolean}          LintIssue object if invalid. True if valid
 */
let lint = function(packageJsonData, validValues) {
  if (!isValidValue(packageJsonData, nodeName, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
