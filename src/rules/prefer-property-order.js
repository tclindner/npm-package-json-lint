const {isInPreferredOrder} = require('../validators/property-order');
const LintIssue = require('../LintIssue');

const lintId = 'prefer-property-order';
const nodeName = '';
const message = 'Your package.json properties are not in the desired order.';
const ruleType = 'array';
const minItems = 0;

const lint = (packageJsonData, severity, preferredOrder) => {
  const result = isInPreferredOrder(packageJsonData, preferredOrder);

  if (!result.status) {
    return new LintIssue(lintId, severity, nodeName, `${message} ${result.msg}`);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
  minItems,
};
