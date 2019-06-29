const {doVersContainNonAbsolute} = require('../validators/dependency-audit');
const {exists} = require('../validators/property');
const LintIssue = require('../LintIssue');

const lintId = 'prefer-absolute-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please use absolute versions.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (exists(packageJsonData, nodeName) && doVersContainNonAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
