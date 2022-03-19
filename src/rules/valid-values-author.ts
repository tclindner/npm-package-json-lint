import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {LintResult} from '../types/lint-result';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {isString, isObject} from '../validators/type';
import {isValidValue} from '../validators/valid-values';

const lintId = 'valid-values-author';
const nodeName = 'author';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const arrayType = 'string';

export const lint = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  validValues: T[]
): LintResult => {
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

  if (!isValidValue<T>(packageJsonData, nodeName, value, validValues)) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `Invalid value for author. Current value is ${value}. Value values include: ${validValues.join(', ')}.`
    );
  }

  return null;
};
