const {hasDependency} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');
const lintId = 'no-restricted-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted dependency. Please remove it.';
const ruleType = 'array';

const lint = (packageJsonData, severity, invalidDependencies) => {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
