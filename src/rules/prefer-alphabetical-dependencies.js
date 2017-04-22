'use strict';

const isInAlphabeticalOrder = require('./../validators/alphabetical-sort').isInAlphabeticalOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-alphabetical-dependencies';
const nodeName = 'dependencies';
const message = 'Your dependencies are not in alphabetical order. Please update the order.';
const ruleType = 'dependencies-alphabetical-order';

const lint = function(packageJsonData, lintType) {
  if (!isInAlphabeticalOrder(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
