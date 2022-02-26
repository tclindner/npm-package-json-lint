import validateName from 'validate-npm-package-name';
import {getNameError} from '../utils/getNameError';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'name-format';
const nodeName = 'name';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return null;
  }

  const name = packageJsonData[nodeName];
  const results = validateName(name);

  if (!results.validForNewPackages) {
    return new LintIssue(lintId, severity, nodeName, getNameError(results));
  }

  return null;
};
