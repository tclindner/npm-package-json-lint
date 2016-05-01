"use strict";

const isValidVersionNumber = require("./../validators/format").isValidVersionNumber;
const LintIssue = require("./../LintIssue");
const lintId = "version-format";
const lintType = "error";
const nodeName = "version";
const message = "Format must be a valid semantic version";
const ruleType = "format";

const lint = function(packageJsonData) {
  if (!isValidVersionNumber(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
