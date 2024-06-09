import {PackageJson} from 'type-fest';
import {LintResult} from './lint-result';
import {Severity} from './severity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StandardLintFunction = (packageJsonData: PackageJson | any, severity: Severity) => LintResult;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ArrayLintFunction = <T>(packageJsonData: PackageJson | any, severity: Severity, ruleConfig: T[]) => LintResult;

export type ObjectLintFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  ruleConfig: Record<string, boolean>,
) => LintResult;

export interface OptionalObjectRuleConfig {
  exceptions?: string[];
}

export type OptionalObjectLintFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  ruleConfig: OptionalObjectRuleConfig,
) => LintResult;

export type LintFunction = StandardLintFunction | ArrayLintFunction | ObjectLintFunction | OptionalObjectLintFunction;
