const {areVersRangesValid} = require('./../validators/dependency-audit');
const LintIssue = require('./../LintIssue');

const lintId = 'prefer-caret-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please use ^.';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  const rangeSpecifier = '^';

  if (!areVersRangesValid(packageJsonData, nodeName, rangeSpecifier)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
