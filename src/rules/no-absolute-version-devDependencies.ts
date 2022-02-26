const {areVersionsAbsolute} = require('../validators/dependency-audit');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-absolute-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please do not use absolute versions.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  if (packageJsonData.hasOwnProperty(nodeName) && areVersionsAbsolute(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
