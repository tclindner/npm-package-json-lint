const {doVersContainArchiveUrl} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');

const lintId = 'no-archive-dependencies';
const nodeName = 'dependencies';
const message = 'You are using dependencies via url to archive file. Please use dependencies from npm.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainArchiveUrl(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
