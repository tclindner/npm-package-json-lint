import {PackageJson} from 'type-fest';
import {auditDependenciesWithMajorVersionOfZero} from '../validators/dependency-audit';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'prefer-no-version-zero-devDependencies';
const nodeName = 'devDependencies';

export const ruleType = RuleType.OptionalObject;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity, config: any): LintIssue | null => {
  const auditResult = auditDependenciesWithMajorVersionOfZero(packageJsonData, nodeName, config);

  if (exists(packageJsonData, nodeName) && auditResult.hasDependencyWithMajorVersionOfZero) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `You have invalid version 0 dependencies. Please use modules with a major version >= 1. Invalid ${nodeName} include: ${auditResult.dependenciesWithMajorVersionOfZero.join(
        ', ',
      )}`,
    );
  }

  return null;
};
