import {PackageJson} from 'type-fest';
import {auditDependenciesForGitRepositoryVersion} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-git-dependencies';
const nodeName = 'dependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const auditResult = auditDependenciesForGitRepositoryVersion(packageJsonData, nodeName, config);

  if (packageJsonData.hasOwnProperty(nodeName) && auditResult.hasGitRepositoryVersions) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using ${nodeName} from git repository. Please use ${nodeName} from npm. Invalid ${nodeName} include: ${auditResult.dependenciesWithGitRepositoryVersion.join(
        ', '
      )}`
    );
  }

  return null;
};
