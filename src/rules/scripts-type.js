"use strict";

let isObject = require("./../validators/type").isObject;
let LintIssue = require("./../LintIssue");
const lintId = "scripts-type";
const lintType = "error";
const nodeName = "scripts";
const message = "Type should be an Object";
const ruleType = "type";

let lint = function(packageJsonData) {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
