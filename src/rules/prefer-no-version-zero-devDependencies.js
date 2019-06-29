const {hasDepVersZero} = require('./../validators/dependency-audit');
const {exists} = require('../validators/property');
const LintIssue = require('./../LintIssue');

const lintId = 'prefer-no-version-zero-devDependencies';
const nodeName = 'devDependencies';
const message = 'You have invalid version 0 dependencies. Please use modules with a major version >= 1.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (exists(packageJsonData, nodeName) && hasDepVersZero(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
