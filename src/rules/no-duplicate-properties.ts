import {PackageJson} from 'type-fest';
import {sourceSymbol} from '../file-parser';
import {findDuplicatePropNames} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';

const lintId = 'no-duplicate-properties';
const nodeName = '';

export const ruleType = RuleType.Standard;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  /**
   * If we send package json straight to npm-package-json-lint, fallback to empty string.
   * Because we already lose information about duplicate properties.
   */
  const source = packageJsonData[sourceSymbol] || '';
  const dupProps = findDuplicatePropNames(source);

  if (dupProps.length > 0) {
    const message = `Duplicate properties detected. Please remove duplicates for: ${dupProps.join(', ')}.`;

    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
