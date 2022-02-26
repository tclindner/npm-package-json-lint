import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'require-config';
const nodeName = 'config';
const message = 'config is required';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
