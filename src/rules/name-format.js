'use strict';

const isLowercase = require('./../validators/format').isLowercase;
const LintIssue = require('./../LintIssue');
const lintId = 'name-format';
const lintType = 'error';
const nodeName = 'name';
const message = 'Format should be all lowercase';
const ruleType = 'format';

const lint = function(packageJsonData) {
  if (!isLowercase(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
