'use strict';

const isString = require('./../validators/type').isString;
const LintIssue = require('./../LintIssue');
const lintId = 'license-type';
const nodeName = 'license';
const message = 'Type should be a string';
const ruleType = 'type';

const lint = function(packageJsonData, lintType) {
  if (!isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
