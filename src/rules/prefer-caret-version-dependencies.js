const {areVersRangesValid} = require('./../validators/dependency-audit');
const {exists} = require('../validators/property');
const LintIssue = require('./../LintIssue');

const lintId = 'prefer-caret-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please use ^.';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity, config) => {
  const rangeSpecifier = '^';

  if (exists(packageJsonData, nodeName) && !areVersRangesValid(packageJsonData, nodeName, rangeSpecifier, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
