import {isInAlphabeticalOrder} from '../validators/alphabetical-sort';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-alphabetical-optionalDependencies';
const nodeName = 'optionalDependencies';
const message = 'Your optionalDependencies are not in alphabetical order.';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!exists(packageJsonData, nodeName)) {
    return null;
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

  return null;
};
