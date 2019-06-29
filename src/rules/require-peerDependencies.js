const LintIssue = require('./../LintIssue');

const lintId = 'require-peerDependencies';
const nodeName = 'peerDependencies';
const message = 'peerDependencies is required';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
