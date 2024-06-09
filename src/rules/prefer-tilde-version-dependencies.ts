import {PackageJson} from 'type-fest';
import {auditDependenciesForValidRangeVersions} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-tilde-version-dependencies';
const nodeName = 'dependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const rangeSpecifier = '~';
  const auditResult = auditDependenciesForValidRangeVersions(packageJsonData, nodeName, rangeSpecifier, config);

  if (exists(packageJsonData, nodeName) && !auditResult.onlyValidVersionsDetected) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using an invalid version range. Please use ~. Invalid ${nodeName} include: ${auditResult.dependenciesWithoutValidVersionRange.join(
        ', ',
      )}`,
    );
  }

  return null;
};
