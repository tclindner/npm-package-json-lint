import {PackageJson} from 'type-fest';
import {auditDependenciesForNonAbsoluteVersion} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-absolute-version-devDependencies';
const nodeName = 'devDependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const auditResult = auditDependenciesForNonAbsoluteVersion(packageJsonData, nodeName, config);

  if (exists(packageJsonData, nodeName) && auditResult.onlyNonAbsoluteVersionsDetected) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using an invalid version range. Please use absolute versions. Invalid ${nodeName} include: ${auditResult.dependenciesWithoutAbsoluteVersion.join(
        ', ',
      )}`,
    );
  }

  return null;
};
