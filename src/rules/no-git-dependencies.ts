const {doVersContainGitRepository} = require('../validators/dependency-audit');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-git-dependencies';
const nodeName = 'dependencies';
const message = 'You are using dependencies from git repository. Please use dependencies from npm.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson, severity: Severity, config: any): LintIssue | boolean => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainGitRepository(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
