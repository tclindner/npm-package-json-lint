import {PackageJson} from 'type-fest';
import {auditDependenciesWithRestrictedPrereleaseVersion} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-restricted-pre-release-dependencies';
const nodeName = 'dependencies';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  invalidPreRelDeps: string[],
): LintIssue | null => {
  const auditResult = auditDependenciesWithRestrictedPrereleaseVersion(packageJsonData, nodeName, invalidPreRelDeps);

  if (auditResult.hasDependencyWithRestrictedPrereleaseVersion) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using a restricted pre-release dependency. Please remove it. Invalid ${nodeName} include: ${auditResult.dependenciesWithRestrictedPrereleaseVersion.join(
        ', ',
      )}`,
    );
  }

  return null;
};
