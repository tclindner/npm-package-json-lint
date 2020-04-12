const {isArray} = require('../validators/type');
const LintIssue = require('../LintIssue');

const lintId = 'os-type';
const nodeName = 'os';
const message = 'Type should be an array';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
