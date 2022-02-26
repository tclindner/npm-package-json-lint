import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'prefer-scripts';
const nodeName = 'scripts';
const message = 'Your package.json scripts object must include:';
export const ruleType = RuleType.Array;
export const minItems = 1;

export const lint = (packageJsonData: PackageJson, severity: Severity, requiredScripts: any): LintIssue | boolean => {
  if (exists(packageJsonData, 'scripts')) {
    const scripts = Object.keys(packageJsonData.scripts);
    const allRequiredScriptsPresent = requiredScripts.every((requiredScript) => scripts.includes(requiredScript));

    if (!allRequiredScriptsPresent) {
      return new LintIssue(lintId, severity, nodeName, `${message} ${requiredScripts.join(', ')}.`);
    }
  }

  return true;
};
