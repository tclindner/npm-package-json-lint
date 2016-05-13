'use strict';

const LintIssue = require('./../LintIssue');
const lintId = 'bugs-recommended';
const lintType = 'warning';
const nodeName = 'bugs';
const message = 'bugs is recommended';
const ruleType = 'recommended';

const lint = function(packageJsonData) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
