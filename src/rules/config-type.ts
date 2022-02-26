import {isObject} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'config-type';
const nodeName = 'config';
const message = 'Type should be an Object';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson, severity: Severity): LintIssue | boolean => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
