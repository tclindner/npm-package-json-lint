const {doVersContainArchiveUrl} = require('../validators/dependency-audit');
const LintIssue = require('../LintIssue');

const lintId = 'no-archive-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using devDependencies via url to archive file. Please use devDependencies from npm.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainArchiveUrl(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
