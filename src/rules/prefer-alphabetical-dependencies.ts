import {isInAlphabeticalOrder} from '../validators/alphabetical-sort';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-alphabetical-dependencies';
const nodeName = 'dependencies';
const message = 'Your dependencies are not in alphabetical order.';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson, severity: Severity): LintIssue | boolean => {
  if (!exists(packageJsonData, nodeName)) {
    return true;
  }

  const result = isInAlphabeticalOrder(packageJsonData, nodeName);

  if (!result.status) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`
    );
  }

  return true;
};
