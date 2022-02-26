import {doVersContainNonAbsolute} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-absolute-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please use absolute versions.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson, severity: Severity, config: any): LintIssue | boolean => {
  if (exists(packageJsonData, nodeName) && doVersContainNonAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
