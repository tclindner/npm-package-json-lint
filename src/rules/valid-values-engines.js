'use strict';

/* eslint max-statements: 'off' */

const LintIssue = require('./../LintIssue');
const isObject = require('./../validators/type').isObject;
const isValidValue = require('./../validators/valid-values').isValidValue;
const semver = require('semver');
const lintId = 'valid-values-engines';
const nodeName = 'engines';
const message = 'Invalid value for engines';
const ruleType = 'array';

const lint = function(packageJsonData, severity, validValues) {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    if (isObject(packageJsonData, nodeName)) {
      const validValuesAsJson = validValues.map((validValue) => JSON.stringify(validValue));
      const valueAsJson = JSON.stringify(packageJsonData[nodeName]);

      if (!isValidValue(packageJsonData, nodeName, valueAsJson, validValuesAsJson)) {
        return new LintIssue(lintId, severity, nodeName, message);
      }

      for(const engineDefinition in packageJsonData[nodeName]) {
        const versionRange = packageJsonData[nodeName][engineDefinition];

        if (semver.valid(versionRange) !== null) {
          return new LintIssue(lintId, severity, nodeName, `engines, ${engineDefinition} version range is invalid. Currently set to ${versionRange}`);
        }
      }
    } else {
      return new LintIssue(lintId, severity, nodeName, 'engines node has invalid data type');
    }
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
