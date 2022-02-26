const {doVersContainInvalidRange} = require('../validators/dependency-audit');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-caret-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please do not use ^.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson, severity: Severity, config: any): LintIssue | boolean => {
  const rangeSpecifier = '^';

  if (
    packageJsonData.hasOwnProperty(nodeName) &&
    doVersContainInvalidRange(packageJsonData, nodeName, rangeSpecifier, config)
  ) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
