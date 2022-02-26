import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {matchValidValue} from '../validators/valid-values';

const lintId = 'valid-values-name-scope';
const nodeName = 'name';
const message = 'Invalid value for name scope';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, validValues: any): LintIssue | null => {
  const validRegexes = validValues.map((scope) => new RegExp(`^${scope}/`));

  if (!matchValidValue(packageJsonData, nodeName, packageJsonData[nodeName], validRegexes)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
