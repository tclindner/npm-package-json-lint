const {doVersContainInvalidRange} = require('../validators/dependency-audit');
const LintIssue = require('../LintIssue');

const lintId = 'no-caret-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please do not use ^.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  const rangeSpecifier = '^';

  if (
    packageJsonData.hasOwnProperty(nodeName) &&
    doVersContainInvalidRange(packageJsonData, nodeName, rangeSpecifier, config)
  ) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
