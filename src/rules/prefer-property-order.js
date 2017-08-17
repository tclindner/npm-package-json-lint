'use strict';

const isInPreferredOrder = require('./../validators/property-order').isInPreferredOrder;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-property-order';
const nodeName = '';
const message = 'Your package.json properties are not in the desired order.';
const ruleType = 'property-order';

const lint = function(packageJsonData, lintType, preferredOrder) {
  const result = isInPreferredOrder(packageJsonData, preferredOrder);

  if (!result.status) {
    let helpTip = '';

    if (result.data.actualNode === null) {
      helpTip = `Please add ${result.data.desiredNode} at the end of the file.`;
    } else {
      helpTip = `Please move ${result.data.actualNode} after ${result.data.desiredNode}.`;
    }

    return new LintIssue(lintId, lintType, nodeName, `${message} ${helpTip}`);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
