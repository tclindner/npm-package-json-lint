import {PackageJson} from 'type-fest';
import {isInPreferredOrder} from '../validators/property-order';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-property-order';
const nodeName = '';
const message = 'Your package.json properties are not in the desired order.';

export const ruleType = RuleType.Array;

export const minItems = 0;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  preferredOrder: string[],
): LintIssue | null => {
  const result = isInPreferredOrder(packageJsonData, preferredOrder);

  if (!result.status) {
    return new LintIssue(lintId, severity, nodeName, `${message} ${result.msg}`);
  }

  return null;
};
