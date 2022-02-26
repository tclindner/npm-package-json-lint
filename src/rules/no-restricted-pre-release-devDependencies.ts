const {hasDepPrereleaseVers} = require('../validators/dependency-audit');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-restricted-pre-release-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using a restricted pre-release dependency. Please remove it.';
export const ruleType = RuleType.Array;
export const minItems = 1;

export const lint = (packageJsonData: PackageJson, severity: Severity, invalidPreRelDeps: string[]): LintIssue | boolean => {
  if (hasDepPrereleaseVers(packageJsonData, nodeName, invalidPreRelDeps)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
