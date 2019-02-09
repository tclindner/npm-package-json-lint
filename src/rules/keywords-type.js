const {isArray} = require('./../validators/type');
const LintIssue = require('./../LintIssue');

const lintId = 'keywords-type';
const nodeName = 'keywords';
const message = 'Type should be an Array';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
