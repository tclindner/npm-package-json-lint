'use strict';

const LintIssue = require('./../LintIssue');
const isValidValue = require('./../validators/valid-values').isValidValue;
const lintId = 'valid-values-license';
const nodeName = 'license';
const message = 'Invalid value for license';
const ruleType = 'array';

/**
 * Lints package.json file to check for valid values in the license field
 *
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
const lint = function(packageJsonData, severity, validValues) {
  if (!isValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validValues)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
