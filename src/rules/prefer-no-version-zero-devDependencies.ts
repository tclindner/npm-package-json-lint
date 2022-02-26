const {hasDepVersZero} = require('../validators/dependency-audit');
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-no-version-zero-devDependencies';
const nodeName = 'devDependencies';
const message = 'You have invalid version 0 dependencies. Please use modules with a major version >= 1.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  if (exists(packageJsonData, nodeName) && hasDepVersZero(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
