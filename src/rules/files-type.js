'use strict';

const isArray = require('./../validators/type').isArray;
const LintIssue = require('./../LintIssue');
const lintId = 'files-type';
const nodeName = 'files';
const message = 'Type should be an Array';
const ruleType = 'type';

const lint = function(packageJsonData, lintType) {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
