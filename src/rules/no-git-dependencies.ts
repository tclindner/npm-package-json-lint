import {PackageJson} from 'type-fest';
import {doVersContainGitRepository} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-git-dependencies';
const nodeName = 'dependencies';
const message = 'You are using dependencies from git repository. Please use dependencies from npm.';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  if (packageJsonData.hasOwnProperty(nodeName) && doVersContainGitRepository(packageJsonData, nodeName, config)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
