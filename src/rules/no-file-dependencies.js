const {doVersContainFileUrl} = require('../validators/dependency-audit');
const LintIssue = require('../LintIssue');

const lintId = 'no-file-dependencies';
const nodeName = 'dependencies';
const message = 'You are using dependencies via url to local file. Please use dependencies from npm.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainFileUrl(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
