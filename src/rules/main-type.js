'use strict';

const isString = require('./../validators/type').isString;
const LintIssue = require('./../LintIssue');
const lintId = 'main-type';
const nodeName = 'main';
const message = 'Type should be a string';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
