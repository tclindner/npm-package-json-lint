import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {LintResult} from '../types/lint-result';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {isValidValue} from '../validators/valid-values';

const lintId = 'valid-values-private';
const nodeName = 'private';

export const ruleType = RuleType.Array;

export const minItems = 1;

/**
 * [function description]
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  validValues: boolean[]
): LintResult => {
  if (!isValidValue<boolean>(packageJsonData, nodeName, packageJsonData[nodeName], validValues)) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `Invalid value for private. Current value is ${packageJsonData[nodeName]}. Valid values include: ${validValues.join(
        ', '
      )}.`
    );
  }

  return null;
};
