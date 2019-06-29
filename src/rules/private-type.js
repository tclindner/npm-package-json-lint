const LintIssue = require('./../LintIssue');
const {isBoolean} = require('./../validators/type');

const lintId = 'private-type';
const nodeName = 'private';
const message = 'Type should be a boolean';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isBoolean(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
