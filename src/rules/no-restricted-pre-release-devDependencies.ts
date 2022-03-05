import {PackageJson} from 'type-fest';
import {hasDepPrereleaseVers} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-restricted-pre-release-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using a restricted pre-release dependency. Please remove it.';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  invalidPreRelDeps: string[]
): LintIssue | null => {
  if (hasDepPrereleaseVers(packageJsonData, nodeName, invalidPreRelDeps)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
