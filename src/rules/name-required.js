'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'name-required';
const lintType = 'error';
const nodeName = 'name';
const message = 'name is required';
const ruleType = 'required';

const lint = function(packageJsonData) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
