'use strict';

const LintIssue = require('./../LintIssue');
const isValidValue = require('./../validators/valid-values').isValidValue;
const lintId = 'valid-values-author';
const nodeName = 'author';
const message = 'Invalid value for author';
const ruleType = 'array';

const lint = function(packageJsonData, lintType, validValues) {
  if (!isValidValue(packageJsonData, nodeName, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
