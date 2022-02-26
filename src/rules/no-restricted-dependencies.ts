import {hasDependency} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-restricted-dependencies';
const nodeName = 'dependencies';
const message = 'You are using a restricted dependency. Please remove it.';
export const ruleType = RuleType.Array;
export const minItems = 1;

export const lint = (packageJsonData: PackageJson, severity: Severity, invalidDependencies: string[]): LintIssue | boolean => {
  if (hasDependency(packageJsonData, nodeName, invalidDependencies)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
