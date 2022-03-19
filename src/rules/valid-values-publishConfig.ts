import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {LintResult} from '../types/lint-result';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {isObject} from '../validators/type';
import {isValidValue} from '../validators/valid-values';

const lintId = 'valid-values-publishConfig';
const nodeName = 'publishConfig';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  validValues: object[]
): LintResult => {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    if (isObject(packageJsonData, nodeName)) {
      const validValuesAsJsonString = validValues.map((validValue) => JSON.stringify(validValue));
      const valueAsJsonString = JSON.stringify(packageJsonData[nodeName]);

      if (!isValidValue<string>(packageJsonData, nodeName, valueAsJsonString, validValuesAsJsonString)) {
        return new LintIssue(lintId, severity, nodeName, `Invalid value for publishConfig. Current value is ${valueAsJsonString}. Value values include: ${validValuesAsJsonString.join(', ')}.`);
      }
    } else {
      return new LintIssue(lintId, severity, nodeName, 'publishConfig node has invalid data type');
    }
  }

  return null;
};
