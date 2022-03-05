import {PackageJson} from 'type-fest';
import {hasDependency} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-restricted-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted dependency. Please remove it.';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  invalidDependencies: string[]
): LintIssue | null => {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
