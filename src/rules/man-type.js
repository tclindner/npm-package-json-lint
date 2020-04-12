const {isArray} = require('../validators/type');
const {isString} = require('../validators/type');
const LintIssue = require('../LintIssue');

const lintId = 'man-type';
const nodeName = 'man';
const message = 'Type should be either a string or an array';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isArray(packageJsonData, nodeName) && !isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
