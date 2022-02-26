import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'require-repository-directory';
const nodeName = 'repository';
const parentNodeMessage = 'repository is required';
const message = 'repository object missing directory property';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, severity, nodeName, parentNodeMessage);
  }

  if (!packageJsonData[nodeName].hasOwnProperty('directory')) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
