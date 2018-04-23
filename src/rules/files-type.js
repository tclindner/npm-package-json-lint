'use strict';

const isArray = require('./../validators/type').isArray;
const LintIssue = require('./../LintIssue');
const lintId = 'files-type';
const nodeName = 'files';
const message = 'Type should be an Array';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
