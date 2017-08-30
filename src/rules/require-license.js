'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'require-license';
const nodeName = 'license';
const message = 'license is required';
const ruleType = 'standard';

const lint = function(packageJsonData, lintType) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
