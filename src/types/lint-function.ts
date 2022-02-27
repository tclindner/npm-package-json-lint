import {PackageJson} from 'type-fest';
import {LintResult} from './lint-result';
import {Severity} from './severity';

export interface StandardLintFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (packageJsonData: PackageJson | any, severity: Severity): LintResult;
}

export interface ArrayLintFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T>(packageJsonData: PackageJson | any, severity: Severity, ruleConfig: T[]): LintResult;
}

export interface ObjectLintFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (packageJsonData: PackageJson | any, severity: Severity, ruleConfig: Record<string, boolean>): LintResult;
}

export interface OptionalObjectRuleConfig {
  exceptions?: string[];
}

export interface OptionalObjectLintFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (packageJsonData: PackageJson | any, severity: Severity, ruleConfig: OptionalObjectRuleConfig): LintResult;
}

export type LintFunction = StandardLintFunction | ArrayLintFunction | ObjectLintFunction | OptionalObjectLintFunction;
