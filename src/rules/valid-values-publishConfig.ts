import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';
import {isObject} from '../validators/type';
import {isValidValue} from '../validators/valid-values';

const lintId = 'valid-values-publishConfig';
const nodeName = 'publishConfig';
const message = 'Invalid value for publishConfig';
export const ruleType = RuleType.Array;
export const minItems = 1;

export const lint = (packageJsonData: PackageJson | any, severity: Severity, validValues: any): LintIssue | null => {
  if (packageJsonData.hasOwnProperty(nodeName)) {
    if (isObject(packageJsonData, nodeName)) {
      const validValuesAsJson = validValues.map((validValue) => JSON.stringify(validValue));
      const valueAsJson = JSON.stringify(packageJsonData[nodeName]);

      if (!isValidValue(packageJsonData, nodeName, valueAsJson, validValuesAsJson)) {
        return new LintIssue(lintId, severity, nodeName, message);
      }
    } else {
      return new LintIssue(lintId, severity, nodeName, 'publishConfig node has invalid data type');
    }
  }

  return null;
};
