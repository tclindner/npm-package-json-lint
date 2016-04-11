"use strict";

let LintIssue = require("./../LintIssue");
const lintId = "engines-required";
const lintType = "error";
const nodeName = "engines";
const message = "engines is required";
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
