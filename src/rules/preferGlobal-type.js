"use strict";

const LintIssue = require("./../LintIssue");
const isBoolean = require("./../validators/type").isBoolean;
const lintId = "preferGlobal-type";
const lintType = "error";
const nodeName = "preferGlobal";
const message = "Type should be a boolean";
const ruleType = "type";

const lint = function(packageJsonData) {
  if (!isBoolean(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
