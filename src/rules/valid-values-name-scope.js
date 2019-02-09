const LintIssue = require('./../LintIssue');
const {matchValidValue} = require('./../validators/valid-values');
const lintId = 'valid-values-name-scope';
const nodeName = 'name';
const message = 'Invalid value for name scope';
const ruleType = 'array';

/**
 * Lints package.json file to check for valid scope values in the name field
 *
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
const lint = (packageJsonData, severity, validValues) => {
  const validRegexes = validValues.map((scope) => new RegExp(`^${scope}/`));

  if (!matchValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validRegexes)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
