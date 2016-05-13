'use strict';

const isObject = require('./../validators/type').isObject;
const isString = require('./../validators/type').isString;
const LintIssue = require('./../LintIssue');
const lintId = 'bin-type';
const lintType = 'error';
const nodeName = 'bin';
const message = 'Type should be either a string or an Object';
const ruleType = 'type';

const lint = function(packageJsonData) {
  if (!isString(packageJsonData, nodeName) && !isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
