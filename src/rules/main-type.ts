import {isString} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'main-type';
const nodeName = 'main';
const message = 'Type should be a string';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson, severity: Severity): LintIssue | boolean => {
  if (!isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
