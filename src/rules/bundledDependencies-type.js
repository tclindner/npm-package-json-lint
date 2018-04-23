'use strict';

const isArray = require('./../validators/type').isArray;
const LintIssue = require('./../LintIssue');
const lintId = 'bundledDependencies-type';
const nodeName = 'bundledDependencies';
const message = 'Type should be an array';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
