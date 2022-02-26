import {PackageJson} from 'type-fest';
import {isBoolean} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'preferGlobal-type';
const nodeName = 'preferGlobal';
const message = 'Type should be a boolean';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!isBoolean(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
