"use strict";

const areVersRangesValid = require("./../validators/dependency-audit").areVersRangesValid;
const LintIssue = require("./../LintIssue");
const lintId = "prefer-caret-version-dependencies";
const lintType = "error";
const nodeName = "dependencies";
const message = "You are using an invalid version range. Please use ^.";
const ruleType = "dependencies-version-range";

const lint = function(packageJsonData) {
  const rangeSpecifier = "^";

  if (!areVersRangesValid(packageJsonData, nodeName, rangeSpecifier)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
