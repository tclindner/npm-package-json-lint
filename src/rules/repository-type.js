const {isObject} = require('../validators/type');
const {isString} = require('../validators/type');
const LintIssue = require('../LintIssue');

const lintId = 'repository-type';
const nodeName = 'repository';
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
  ruleType
};
