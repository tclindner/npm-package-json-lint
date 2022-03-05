import {PackageJson} from 'type-fest';
import {areVersionsAbsolute} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {OptionalObjectRuleConfig} from '../types/lint-function';
import {LintResult} from '../types/lint-result';

const lintId = 'no-absolute-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please do not use absolute versions.';

export const ruleType = RuleType.OptionalObject;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  config: OptionalObjectRuleConfig
): LintResult => {
  if (packageJsonData.hasOwnProperty(nodeName) && areVersionsAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
