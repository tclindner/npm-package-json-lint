const {doVersContainGitRepository} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');

const lintId = 'no-git-dependencies';
const nodeName = 'dependencies';
const message = 'You are using dependencies from git repository. Please use dependencies from npm.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainGitRepository(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
