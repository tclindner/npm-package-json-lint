import {PackageJson} from 'type-fest';
import {auditDependenciesForInvalidRange} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-tilde-version-devDependencies';
const nodeName = 'devDependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const rangeSpecifier = '~';
  const auditResult = auditDependenciesForInvalidRange(packageJsonData, nodeName, rangeSpecifier, config);

  if (packageJsonData.hasOwnProperty(nodeName) && auditResult.hasInvalidRangeVersions) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using an invalid version range. Please do not use ~. Invalid ${nodeName} include: ${auditResult.dependenciesWithInvalidVersionRange.join(
        ', ',
      )}`,
    );
  }

  return null;
};
