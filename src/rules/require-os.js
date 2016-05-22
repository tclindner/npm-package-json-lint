'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'require-os';
const nodeName = 'os';
const message = 'os is required';
const ruleType = 'required';

const lint = function(packageJsonData, lintType) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
