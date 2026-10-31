import type {PackageJson} from 'type-fest';
import {isArray} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'bundledDependencies-type';
const nodeName = 'bundledDependencies';
const message = 'Type should be an array';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null =>
  isArray(packageJsonData, nodeName) ? null : new LintIssue(lintId, severity, nodeName, message);
