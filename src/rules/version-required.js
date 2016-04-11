"use strict";

let LintIssue = require("./../LintIssue");
const lintId = "version-required";
const lintType = "error";
const nodeName = "version";
const message = "version is required";
const ruleType = "required";

let lint = function(packageJsonData) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
