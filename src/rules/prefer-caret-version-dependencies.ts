import {PackageJson} from 'type-fest';
import {areVersRangesValid} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-caret-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please use ^.';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const rangeSpecifier = '^';

  if (exists(packageJsonData, nodeName) && !areVersRangesValid(packageJsonData, nodeName, rangeSpecifier, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
