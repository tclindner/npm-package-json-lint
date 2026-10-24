import type {PackageJson} from 'type-fest';
import {isObject} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'dependencies-type';
const nodeName = 'dependencies';
const message = 'Type should be an Object';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null =>
  isObject(packageJsonData, nodeName) ? null : new LintIssue(lintId, severity, nodeName, message);
