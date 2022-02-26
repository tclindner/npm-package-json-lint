import {isArray} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'os-type';
const nodeName = 'os';
const message = 'Type should be an array';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!isArray(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
