const LintIssue = require('./../LintIssue');
const {isObject} = require('./../validators/type');
const {isValidValue} = require('./../validators/valid-values');

const lintId = 'valid-values-publishConfig';
const nodeName = 'publishConfig';
const message = 'Invalid value for publishConfig';
const ruleType = 'array';

const lint = (packageJsonData, severity, validValues) => {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    if (isObject(packageJsonData, nodeName)) {
      const validValuesAsJson = validValues.map(validValue => JSON.stringify(validValue));
      const valueAsJson = JSON.stringify(packageJsonData[nodeName]);

      if (!isValidValue(packageJsonData, nodeName, valueAsJson, validValuesAsJson)) {
        return new LintIssue(lintId, severity, nodeName, message);
      }
    } else {
      return new LintIssue(lintId, severity, nodeName, 'publishConfig node has invalid data type');
    }
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
