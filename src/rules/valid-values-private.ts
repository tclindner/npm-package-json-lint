import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';
const {isValidValue} = require('../validators/valid-values');

const lintId = 'valid-values-private';
const nodeName = 'private';
const message = 'Invalid value for private';
export const ruleType = RuleType.Array;
export const minItems = 1;

/**
 * [function description]
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
export const lint = (packageJsonData: PackageJson, severity: Severity, validValues: any): LintIssue | boolean => {
  if (!isValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validValues)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
