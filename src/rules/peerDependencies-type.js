const {isObject} = require('./../validators/type');
const LintIssue = require('./../LintIssue');

const lintId = 'peerDependencies-type';
const nodeName = 'peerDependencies';
const message = 'Type should be an Object';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
