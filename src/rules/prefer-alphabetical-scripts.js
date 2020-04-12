const {isInAlphabeticalOrder} = require('../validators/alphabetical-sort');
const {exists} = require('../validators/property');
const LintIssue = require('../LintIssue');

const lintId = 'prefer-alphabetical-scripts';
const nodeName = 'scripts';
const message = 'Your scripts are not in alphabetical order.';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!exists(packageJsonData, nodeName)) {
    return true;
  }

  const result = isInAlphabeticalOrder(packageJsonData, nodeName);

  if (!result.status) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`
    );
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
