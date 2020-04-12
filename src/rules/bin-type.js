const {isObject, isString} = require('../validators/type');
const LintIssue = require('../LintIssue');

const lintId = 'bin-type';
const nodeName = 'bin';
const message = 'Type should be either a string or an Object';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isString(packageJsonData, nodeName) && !isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
