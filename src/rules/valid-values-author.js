'use strict';

const LintIssue = require('./../LintIssue');
const isString = require('./../validators/type').isString;
const isObject = require('./../validators/type').isObject;
const isValidValue = require('./../validators/valid-values').isValidValue;
const lintId = 'valid-values-author';
const nodeName = 'author';
const message = 'Invalid value for author';
const ruleType = 'array';

const lint = function(packageJsonData, lintType, validValues) {
  let value;

  if ((isString(packageJsonData, nodeName))) {
    value = packageJsonData[nodeName];
  } else if (isObject(packageJsonData, nodeName)) {
    if (packageJsonData[nodeName].hasOwnProperty('name')) {
      value = packageJsonData[nodeName].name;
    } else {
      value = 'author object missing name property';
    }
  } else {
    value = 'author node has invalid data type';
  }

  if (!isValidValue(packageJsonData, nodeName, value, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
