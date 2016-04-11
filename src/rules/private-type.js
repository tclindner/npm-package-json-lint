"use strict";

let LintIssue = require("./../LintIssue");
let isBoolean = require("./../validators/type").isBoolean;
const lintId = "private-type";
const lintType = "error";
const nodeName = "private";
const message = "Type should be a boolean";
const ruleType = "type";

let lint = function(packageJsonData) {
  if (!isBoolean(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
