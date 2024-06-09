import {PackageJson} from 'type-fest';
import {exists} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-repeated-dependencies';

export const ruleType = RuleType.Standard;

const dependenciesNode = 'dependencies';
const devDependenciesNode = 'devDependencies';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  if (!exists(packageJsonData, dependenciesNode)) {
    return null;
  }

  if (!exists(packageJsonData, devDependenciesNode)) {
    return null;
  }

  const dependencies = Object.keys(packageJsonData[dependenciesNode]);
  const devDependencies = Object.keys(packageJsonData[devDependenciesNode]);

  /* eslint-disable-next-line no-restricted-syntax */
  for (const dependency of dependencies) {
    if (devDependencies.includes(dependency)) {
      return new LintIssue(
        lintId,
        severity,
        `${dependenciesNode}|${devDependenciesNode}`,
        `${dependency} exists in both ${dependenciesNode} and ${devDependenciesNode}. Please remove it from one of the dependency lists.`,
      );
    }
  }

  return null;
};
