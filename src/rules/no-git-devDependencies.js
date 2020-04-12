const {doVersContainGitRepository} = require('../validators/dependency-audit');
const LintIssue = require('../LintIssue');

const lintId = 'no-git-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using devDependencies from git repository. Please use devDependencies from npm.';
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
