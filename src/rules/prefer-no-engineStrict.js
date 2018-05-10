'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'prefer-no-engineStrict';
const nodeName = 'engineStrict';
const message = 'engineStrict was deprecated with npm v3.0.0. Please remove it from your package.json file';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
