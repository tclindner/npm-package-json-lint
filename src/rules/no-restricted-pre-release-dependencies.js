'use strict';

const hasDepPrereleaseVers = require('./../validators/dependency-audit').hasDepPrereleaseVers;
const LintIssue = require('./../LintIssue');
const lintId = 'no-restricted-pre-release-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted pre-release dependency. Please remove it.';
const ruleType = 'array';

const lint = function(packageJsonData, lintType, invalidPreRelDeps) {
  if (hasDepPrereleaseVers(packageJsonData, nodeName, invalidPreRelDeps)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
