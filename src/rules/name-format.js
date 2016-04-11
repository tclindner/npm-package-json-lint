"use strict";

let isLowercase = require("./../validators/format").isLowercase;
let LintIssue = require("./../LintIssue");
const lintId = "name-format";
const lintType = "error";
const nodeName = "name";
const message = "Format should be all lowercase";
const ruleType = "format";

let lint = function(packageJsonData) {
  if (!isLowercase(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
