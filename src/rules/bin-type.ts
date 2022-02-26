import {isObject, isString} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'bin-type';
const nodeName = 'bin';
const message = 'Type should be either a string or an Object';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!isString(packageJsonData, nodeName) && !isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
