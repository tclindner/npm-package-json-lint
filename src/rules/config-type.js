const {isObject} = require('../validators/type');
const LintIssue = require('../LintIssue');

const lintId = 'config-type';
const nodeName = 'config';
const message = 'Type should be an Object';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
