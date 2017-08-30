'use strict';

const isLowercase = require('./../validators/format').isLowercase;
const LintIssue = require('./../LintIssue');
const lintId = 'name-format';
const nodeName = 'name';
const message = 'Format should be all lowercase';
const ruleType = 'standard';

const lint = function(packageJsonData, lintType) {
  if (!isLowercase(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
