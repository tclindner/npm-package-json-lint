import type {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-provenance';
const nodeName = 'publishConfig.provenance';
const message = 'publishConfig.provenance should be true unless private is true';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (packageJsonData.private === true) {
    return null;
  }

  if (packageJsonData.publishConfig?.provenance !== true) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
