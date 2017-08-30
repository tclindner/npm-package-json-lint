'use strict';

const hasDependency = require('./../validators/dependency-audit').hasDependency;
const LintIssue = require('./../LintIssue');
const lintId = 'no-restricted-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using a restricted dependency. Please remove it.';
const ruleType = 'array';

const lint = function(packageJsonData, lintType, invalidDependencies) {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
