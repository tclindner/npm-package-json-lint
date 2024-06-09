import {PackageJson} from 'type-fest';
import {auditDependenciesWithRestrictedVersion} from '../validators/dependency-audit';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-restricted-devDependencies';
const nodeName = 'devDependencies';

export const ruleType = RuleType.Array;

export const minItems = 1;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  invalidDependencies: string[],
): LintIssue | null => {
  const auditResult = auditDependenciesWithRestrictedVersion(packageJsonData, nodeName, invalidDependencies);

  if (auditResult.hasDependencyWithRestrictedVersion) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You are using a restricted dependency. Please remove it. Invalid ${nodeName} include: ${auditResult.dependenciesWithRestrictedVersion.join(
        ', ',
      )}`,
    );
  }

  return null;
};
