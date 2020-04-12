const LintIssue = require('../LintIssue');

const lintId = 'require-repository-directory';
const nodeName = 'repository';
const parentNodeMessage = 'repository is required';
const message = 'repository object missing directory property';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, parentNodeMessage);
  }

  if (!packageJsonData[nodeName].hasOwnProperty('directory')) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
