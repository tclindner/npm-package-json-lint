'use strict';

const isArray = require('./../validators/type').isArray;
const isString = require('./../validators/type').isString;
const LintIssue = require('./../LintIssue');
const lintId = 'man-type';
const nodeName = 'man';
const message = 'Type should be either a string or an array';
const ruleType = 'standard';

const lint = function(packageJsonData, lintType) {
  if (!isArray(packageJsonData, nodeName) && !isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
