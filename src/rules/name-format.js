const {isLowercase} = require('../validators/format');
const LintIssue = require('../LintIssue');

const lintId = 'name-format';
const nodeName = 'name';
const ruleType = 'standard';
const maxLength = 214;

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  const name = packageJsonData[nodeName];

  if (!isLowercase(name)) {
    return new LintIssue(lintId, severity, nodeName, 'Format should be all lowercase');
  }

  if (name.length > maxLength) {
    return new LintIssue(lintId, severity, nodeName, `name should be less than or equal to ${maxLength} characters.`);
  }

  if (name.startsWith('.') || name.startsWith('_')) {
    return new LintIssue(lintId, severity, nodeName, 'name should not start with . or _');
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
