const validateName = require('validate-npm-package-name');
const LintIssue = require('../LintIssue');
const getNameError = require('../utils/getNameError');

const lintId = 'name-format';
const nodeName = 'name';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  const name = packageJsonData[nodeName];
  const results = validateName(name);

  if (!results.validForNewPackages) {
    return new LintIssue(lintId, severity, nodeName, getNameError(results));
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
