const LintIssue = require('./../LintIssue');
const {isString} = require('./../validators/type');
const {isObject} = require('./../validators/type');
const {isValidValue} = require('./../validators/valid-values');

const lintId = 'valid-values-author';
const nodeName = 'author';
const message = 'Invalid value for author';
const ruleType = 'array';

const lint = (packageJsonData, severity, validValues) => {
  let value;

  if (isString(packageJsonData, nodeName)) {
    value = packageJsonData[nodeName];
  } else if (isObject(packageJsonData, nodeName)) {
    if (packageJsonData[nodeName].hasOwnProperty('name')) {
      value = packageJsonData[nodeName].name;
    } else {
      return new LintIssue(lintId, severity, nodeName, 'author object missing name property');
    }
  } else {
    return new LintIssue(lintId, severity, nodeName, 'author node has invalid data type');
  }

  if (!isValidValue(packageJsonData, nodeName, value, validValues)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
