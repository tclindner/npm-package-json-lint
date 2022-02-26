import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';
const {isString} = require('../validators/type');
const {isObject} = require('../validators/type');
const {isValidValue} = require('../validators/valid-values');

const lintId = 'valid-values-author';
const nodeName = 'author';
const message = 'Invalid value for author';
export const ruleType = RuleType.Array;
export const minItems = 1;

export const lint = (packageJsonData: PackageJson, severity: Severity, validValues: any): LintIssue | boolean => {
  let value;

  if (isString(packageJsonData, nodeName)) {
    value = packageJsonData[nodeName];
  } else if (isObject(packageJsonData, nodeName)) {
    if (packageJsonData[nodeName].hasOwnProperty('name')) {
      value = packageJsonData[nodeName].name;
    } else {
      return new LintIssue(lintId, severity, nodeName, 'author object missing name property');
    }
  } else {
    return new LintIssue(lintId, severity, nodeName, 'author node has invalid data type');
  }

  if (!isValidValue(packageJsonData, nodeName, value, validValues)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
