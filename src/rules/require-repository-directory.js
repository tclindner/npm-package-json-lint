const LintIssue = require('./../LintIssue');

const lintId = 'require-repository-directory';
const nodeName = 'repository';
const message = 'repository object missing directory property';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData[nodeName].hasOwnProperty('directory')) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
