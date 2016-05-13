"use strict";

const hasDepVersZero = require("./../validators/dependency-audit").hasDepVersZero;
const LintIssue = require("./../LintIssue");
const lintId = "prefer-no-version-zero-dependencies";
const lintType = "error";
const nodeName = "dependencies";
const message = "You have invalid version 0 dependencies. Please use modules with a major version >= 1.";
const ruleType = "no-version-zero";

const lint = function(packageJsonData) {
  if (hasDepVersZero(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
