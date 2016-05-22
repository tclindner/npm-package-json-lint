'use strict';

const hasDependency = require('./../validators/dependency-audit').hasDependency;
const LintIssue = require('./../LintIssue');
const lintId = 'no-restricted-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted dependency. Please remove it.';
const ruleType = 'no-restricted-dependencies';

const lint = function(packageJsonData, lintType, invalidDependencies) {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
