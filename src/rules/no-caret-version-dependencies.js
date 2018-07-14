'use strict';

const areVersRangesValid = require('./../validators/dependency-audit').areVersRangesValid;
const LintIssue = require('./../LintIssue');
const lintId = 'no-caret-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please do not use ^.';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  const rangeSpecifier = '^';

  if (packageJsonData.hasOwnProperty(nodeName) && areVersRangesValid(packageJsonData, nodeName, rangeSpecifier)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
