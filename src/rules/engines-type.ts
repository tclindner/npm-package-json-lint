import {isObject} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'engines-type';
const nodeName = 'engines';
const message = 'Type should be an Object';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
