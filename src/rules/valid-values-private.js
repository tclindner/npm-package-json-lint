const LintIssue = require('./../LintIssue');
const {isValidValue} = require('./../validators/valid-values');
const lintId = 'valid-values-private';
const nodeName = 'private';
const message = 'Invalid value for private';
const ruleType = 'array';

/**
 * [function description]
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
const lint = (packageJsonData, severity, validValues) => {
  if (!isValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validValues)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
