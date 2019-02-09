const {isValidVersionNumber} = require('./../validators/format');
const LintIssue = require('./../LintIssue');

const lintId = 'version-format';
const nodeName = 'version';
const message = 'Format must be a valid semantic version';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isValidVersionNumber(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
