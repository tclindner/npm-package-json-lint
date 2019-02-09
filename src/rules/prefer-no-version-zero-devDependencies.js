const {hasDepVersZero} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');

const lintId = 'prefer-no-version-zero-devDependencies';
const nodeName = 'devDependencies';
const message = 'You have invalid version 0 dependencies. Please use modules with a major version >= 1.';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (hasDepVersZero(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
