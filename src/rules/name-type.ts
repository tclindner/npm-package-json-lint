import type {PackageJson} from 'type-fest';
import {isString} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'name-type';
const nodeName = 'name';
const message = 'Type should be a string';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null =>
  isString(packageJsonData, nodeName) ? null : new LintIssue(lintId, severity, nodeName, message);
