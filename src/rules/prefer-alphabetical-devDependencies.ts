import {PackageJson} from 'type-fest';
import {isInAlphabeticalOrder} from '../validators/alphabetical-sort';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-alphabetical-devDependencies';
const nodeName = 'devDependencies';
const message = 'Your devDependencies are not in alphabetical order.';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      `${message} Please move ${result.data.invalidNode} after ${result.data.validNode}.`,
    );
  }

  return null;
};
