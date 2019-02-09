const LintIssue = require('./../LintIssue');

const lintId = 'require-scripts';
const nodeName = 'scripts';
const message = 'scripts is required';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
