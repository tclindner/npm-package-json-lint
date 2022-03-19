import semver from 'semver';
import {PackageJson} from 'type-fest';
import {LintIssue} from '../lint-issue';
import {LintResult} from '../types/lint-result';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {isObject} from '../validators/type';
import {isValidValue} from '../validators/valid-values';

const lintId = 'valid-values-engines';
const nodeName = 'engines';

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
        return new LintIssue(
          lintId,
          severity,
          nodeName,
          `Invalid value for engines. Current value is ${valueAsJsonString}. Value values include: ${validValuesAsJsonString.join(
            ', '
          )}.`
        );
      }

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const engineDefinition in packageJsonData[nodeName]) {
        const versionRange = packageJsonData[nodeName][engineDefinition];

        if (semver.validRange(versionRange) === null) {
          return new LintIssue(
            lintId,
            severity,
            nodeName,
            `engines, ${engineDefinition} version range is invalid. Currently set to ${versionRange}`
          );
        }
      }
    } else {
      return new LintIssue(lintId, severity, nodeName, 'engines node has invalid data type');
    }
  }

  return null;
};
