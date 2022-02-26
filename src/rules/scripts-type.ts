import {PackageJson} from 'type-fest';
import {isObject} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'scripts-type';
const nodeName = 'scripts';
const message = 'Type should be an Object';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  // verify individual scripts are strings
  if (packageJsonData.hasOwnProperty(nodeName)) {
    const scripts = packageJsonData[nodeName];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in scripts) {
      if (scripts.hasOwnProperty(key)) {
        const value = scripts[key];

        if (typeof value !== 'string') {
          return new LintIssue(lintId, severity, nodeName, `script, ${key}, in the "scripts" property is not a string.`);
        }
      }
    }
  }

  return null;
};
