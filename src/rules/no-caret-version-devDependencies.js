'use strict';

const doVersContainInvalidRange = require('./../validators/dependency-audit').doVersContainInvalidRange;
const LintIssue = require('./../LintIssue');
const lintId = 'no-caret-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please do not use ^.';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  const rangeSpecifier = '^';

  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainInvalidRange(packageJsonData, nodeName, rangeSpecifier)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
