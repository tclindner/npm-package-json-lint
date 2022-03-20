import {PackageJson} from 'type-fest';
import {auditDependenciesForAbsoluteVersion} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-absolute-version-devDependencies';
const nodeName = 'devDependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const auditResult = auditDependenciesForAbsoluteVersion(packageJsonData, nodeName, config);

  if (packageJsonData.hasOwnProperty(nodeName) && auditResult.onlyAbsoluteVersionsDetected) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using an invalid version range. Please do not use absolute versions. Invalid ${nodeName} includes: ${auditResult.dependenciesWithAbsoluteVersion.join(
        ', '
      )}`
    );
  }

  return null;
};
