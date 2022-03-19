import {PackageJson} from 'type-fest';
import {auditDependenciesForArchiveUrlVersion} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-archive-dependencies';
const nodeName = 'dependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const auditResult = auditDependenciesForArchiveUrlVersion(packageJsonData, nodeName, config);

  if (packageJsonData.hasOwnProperty(nodeName) && auditResult.hasArchiveUrlVersions) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using ${nodeName} via url to archive file. Please use ${nodeName} from npm. Invalid ${nodeName} include: ${auditResult.dependenciesWithArchiveUrlVersion.join(
        ', '
      )}`
    );
  }

  return null;
};
