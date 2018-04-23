'use strict';

const isObject = require('./../validators/type').isObject;
const LintIssue = require('./../LintIssue');
const lintId = 'engines-type';
const nodeName = 'engines';
const message = 'Type should be an Object';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
