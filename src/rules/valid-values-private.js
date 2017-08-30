'use strict';

const LintIssue = require('./../LintIssue');
const isValidValue = require('./../validators/valid-values').isValidValue;
const lintId = 'valid-values-private';
const nodeName = 'private';
const message = 'Invalid value for private';
const ruleType = 'array';

/**
 * [function description]
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   lintType          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
const lint = function(packageJsonData, lintType, validValues) {
  if (!isValidValue(packageJsonData, nodeName, validValues)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
