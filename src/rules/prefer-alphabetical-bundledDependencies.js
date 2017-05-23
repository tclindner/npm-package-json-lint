'use strict';

const isInAlphabeticalOrder = require('./../validators/alphabetical-sort').isInAlphabeticalOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-alphabetical-bundledDependencies';
const nodeName = 'bundledDependencies';
const message = 'Your bundledDependencies are not in alphabetical order.';
const ruleType = 'bundledDependencies-alphabetical-order';

const lint = function(packageJsonData, lintType) {
  const result = isInAlphabeticalOrder(packageJsonData, nodeName);

  if (!result.status) {
    return new LintIssue(lintId, lintType, nodeName, `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
