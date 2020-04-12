const {areVersionsAbsolute} = require('../validators/dependency-audit');
const LintIssue = require('../LintIssue');

const lintId = 'no-absolute-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please do not use absolute versions.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (packageJsonData.hasOwnProperty(nodeName) && areVersionsAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
