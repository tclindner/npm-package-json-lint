const LintIssue = require('./../LintIssue');

const lintId = 'require-devDependencies';
const nodeName = 'devDependencies';
const message = 'devDependencies is required';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
