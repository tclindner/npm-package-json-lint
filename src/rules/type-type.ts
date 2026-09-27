import type {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {isString} from '../validators/type';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'type-type';
const nodeName = 'type';
const message = 'Type should be a string';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null =>
  isString(packageJsonData, nodeName) ? null : new LintIssue(lintId, severity, nodeName, message);
