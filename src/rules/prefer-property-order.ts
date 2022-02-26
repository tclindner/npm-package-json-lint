import {isInPreferredOrder} from '../validators/property-order';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-property-order';
const nodeName = '';
const message = 'Your package.json properties are not in the desired order.';
export const ruleType = RuleType.Array;
export const minItems = 0;

export const lint = (packageJsonData: PackageJson, severity: Severity, preferredOrder: string[]): LintIssue | boolean => {
  const result = isInPreferredOrder(packageJsonData, preferredOrder);

  if (!result.status) {
    return new LintIssue(lintId, severity, nodeName, `${message} ${result.msg}`);
  }

  return true;
};
