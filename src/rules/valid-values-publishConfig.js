'use strict';

const LintIssue = require('./../LintIssue');
const isObject = require('./../validators/type').isObject;
const isValidValue = require('./../validators/valid-values').isValidValue;
const lintId = 'valid-values-publishConfig';
const nodeName = 'publishConfig';
const message = 'Invalid value for publishConfig';
const ruleType = 'array';

const lint = function(packageJsonData, severity, validValues) {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    if (isObject(packageJsonData, nodeName)) {
      const validValuesAsJson = validValues.map((validValue) => {
        return JSON.stringify(validValue);
      });
      const valueAsJson = JSON.stringify(value);

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
