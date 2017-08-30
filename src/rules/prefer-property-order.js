'use strict';

const isInPreferredOrder = require('./../validators/property-order').isInPreferredOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-property-order';
const nodeName = '';
const message = 'Your package.json properties are not in the desired order.';
const ruleType = 'array';

const lint = function(packageJsonData, lintType, preferredOrder) {
  const result = isInPreferredOrder(packageJsonData, preferredOrder);

  if (!result.status) {
    return new LintIssue(lintId, lintType, nodeName, `${message} ${result.msg}`);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
