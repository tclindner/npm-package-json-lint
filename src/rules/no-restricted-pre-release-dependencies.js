const {hasDepPrereleaseVers} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');

const lintId = 'no-restricted-pre-release-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted pre-release dependency. Please remove it.';
const ruleType = 'array';

const lint = (packageJsonData, severity, invalidPreRelDeps) => {
  if (hasDepPrereleaseVers(packageJsonData, nodeName, invalidPreRelDeps)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
