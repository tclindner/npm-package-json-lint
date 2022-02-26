import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'require-author';
const nodeName = 'author';
const message = 'author is required';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson, severity: Severity): LintIssue | boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
