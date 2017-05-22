'use strict';

const areVersRangesValid = require('./../validators/dependency-audit').areVersRangesValid;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-absolute-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please use absolute versions.';
const ruleType = 'devDependencies-version-range';

const lint = function(packageJsonData, lintType) {
  const rangeSpecifier = '=';

  if (!areVersRangesValid(packageJsonData, nodeName, rangeSpecifier)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
