'use strict';

const isInAlphabeticalOrder = require('./../validators/alphabetical-sort').isInAlphabeticalOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-alphabetical-optionalDependencies';
const nodeName = 'optionalDependencies';
const message = 'Your optionalDependencies are not in alphabetical order.';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  const result = isInAlphabeticalOrder(packageJsonData, nodeName);

  if (!result.status) {
    return new LintIssue(lintId, severity, nodeName, `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
