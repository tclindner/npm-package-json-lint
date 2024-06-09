import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {LintResult} from '../types/lint-result';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {matchValidValue} from '../validators/valid-values';

const lintId = 'valid-values-name-scope';
const nodeName = 'name';

export const ruleType = RuleType.Array;

export const minItems = 1;

/**
 * Lints package.json file to check for valid scope values in the name field
 *
 * @param  {Object}   packageJsonData   Valid package.json object
 * @param  {String}   severity          'error' or 'warning'
 * @param  {Array}    validValues       An array of valid values
 * @return {Object|Boolean}             LintIssue object if invalid. True if valid
 */
export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  validValues: string[],
): LintResult => {
  const validRegexes = validValues.map((scope) => new RegExp(`^${scope}/`));

  if (!matchValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validRegexes)) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `Invalid value for name scope. Current value is ${
        packageJsonData[nodeName]
      }. Valid values include: ${validValues.join(', ')}.`,
    );
  }

  return null;
};
