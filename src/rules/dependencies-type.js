"use strict";

let isObject = require("./../validators/type").isObject;
let LintIssue = require("./../LintIssue");
const lintId = "dependencies-type";
const lintType = "error";
const nodeName = "dependencies";
const message = "Type should be an Object";

let lint = function(packageJsonData) {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
