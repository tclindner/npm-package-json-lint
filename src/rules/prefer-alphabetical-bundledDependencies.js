const {isInAlphabeticalOrder} = require('./../validators/alphabetical-sort');
const LintIssue = require('./../LintIssue');

const lintId = 'prefer-alphabetical-bundledDependencies';
const nodeName = 'bundledDependencies';
const message = 'Your bundledDependencies are not in alphabetical order.';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
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

module.exports.lint = lint;
module.exports.ruleType = ruleType;
