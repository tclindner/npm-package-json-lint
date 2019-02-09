const {isLowercase} = require('./../validators/format');
const LintIssue = require('./../LintIssue');
const lintId = 'name-format';
const nodeName = 'name';
const message = 'Format should be all lowercase';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!isLowercase(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
