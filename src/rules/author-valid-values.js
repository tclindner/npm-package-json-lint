"use strict";

const LintIssue = require("./../LintIssue");
const isValidValue = require("./../validators/valid-values").isValidValue;
const lintId = "author-valid-values";
const lintType = "error";
const nodeName = "author";
const message = "Invalid value for author";
const ruleType = "valid-values";

const lint = function(packageJsonData, validValues) {
  if (!isValidValue(packageJsonData, nodeName, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
