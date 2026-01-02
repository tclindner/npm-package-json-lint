import {PackageJson} from 'type-fest';
import {auditDependenciesWithRestrictedPackage, RestrictedDependencyWithReplacement} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-restricted-dependencies';
const nodeName = 'dependencies';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  invalidDependencies: string[] | RestrictedDependencyWithReplacement[],
): LintIssue | null => {
  const auditResult = auditDependenciesWithRestrictedPackage(packageJsonData, nodeName, invalidDependencies);

  if (auditResult.hasDependencyWithRestrictedPackage) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using a restricted dependency. Please remove it. Invalid ${nodeName} include: ${auditResult.errorMessage}`,
    );
  }

  return null;
};
