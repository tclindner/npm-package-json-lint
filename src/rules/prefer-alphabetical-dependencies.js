'use strict';

const isInAlphabeticalOrder = require('./../validators/alphabetical-sort').isInAlphabeticalOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-alphabetical-dependencies';
const nodeName = 'dependencies';
const message = 'Your dependencies are not in alphabetical order.';
const ruleType = 'dependencies-alphabetical-order';

const lint = function(packageJsonData, lintType) {
  const result = isInAlphabeticalOrder(packageJsonData, nodeName);

  if (!result.status) {
    return new LintIssue(lintId, lintType, nodeName, `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
