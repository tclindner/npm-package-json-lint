const {doVersContainArchiveUrl} = require('../validators/dependency-audit');
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-archive-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using devDependencies via url to archive file. Please use devDependencies from npm.';
export const ruleType = RuleType.OptionalObject;

export const lint = (packageJsonData: PackageJson, severity: Severity, config: any): LintIssue | boolean => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainArchiveUrl(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};
