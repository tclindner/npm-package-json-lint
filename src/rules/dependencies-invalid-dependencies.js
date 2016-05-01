"use strict";

const hasDependency = require("./../validators/dependency-audit").hasDependency;
const LintIssue = require("./../LintIssue");
const lintId = "dependencies-invalid-dependencies";
const lintType = "error";
const nodeName = "dependencies";
const message = "You are using an invalid dependency. Please remove it.";
const ruleType = "invalid-dependencies";

const lint = function(packageJsonData, invalidDependencies) {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
