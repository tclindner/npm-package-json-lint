/* eslint no-restricted-syntax: 'off' */

const {isObject} = require('../validators/type');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'scripts-type';
const nodeName = 'scripts';
const message = 'Type should be an Object';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson, severity: Severity): LintIssue | boolean => {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  // verify individual scripts are strings
  if (packageJsonData.hasOwnProperty(nodeName)) {
    const scripts = packageJsonData[nodeName];

    for (const key in scripts) {
      if (scripts.hasOwnProperty(key)) {
        const value = scripts[key];

        if (typeof value !== 'string') {
          return new LintIssue(lintId, severity, nodeName, `script, ${key}, in the "scripts" property is not a string.`);
        }
      }
    }
  }

  return true;
};
