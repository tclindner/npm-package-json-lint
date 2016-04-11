"use strict";

let hasDependencyPrereleaseVersion = require("./../validators/dependency-audit").hasDependencyPrereleaseVersion;
let LintIssue = require("./../LintIssue");
const lintId = "devDependencies-invalid-pre-release-dependencies";
const lintType = "error";
const nodeName = "devDependencies";
const message = "You are using an invalid pre-release dependency. Please remove it.";
const ruleType = "invalid-pre-release-dependencies";

let lint = function(packageJsonData, invalidPreReleaseDependencies) {
  if (hasDependencyPrereleaseVersion(packageJsonData, nodeName, invalidPreReleaseDependencies)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
