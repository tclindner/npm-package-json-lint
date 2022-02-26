import {PackageJson} from 'type-fest';
import {doVersContainNonAbsolute} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-absolute-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please use absolute versions.';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  if (exists(packageJsonData, nodeName) && doVersContainNonAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
