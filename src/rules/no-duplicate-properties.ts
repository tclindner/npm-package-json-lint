import {Parser} from '../Parser';
import {findDuplicatePropNames} from '../validators/property';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'no-duplicate-properties';
const nodeName = '';
export const ruleType = RuleType.Standard;

export const lint = (packageJsonData: PackageJson | any, severity: Severity): LintIssue | null => {
  /**
   * If we send package json straight to npm-package-json-lint, fallback to empty string.
   * Because we already lose information about duplicate properties.
   */
  const source = packageJsonData[Parser.sourceSymbol] || '';
  const dupProps = findDuplicatePropNames(source);

  if (dupProps.length > 0) {
    const message = `Duplicate properties detected. Please remove duplicates for: ${dupProps.join(', ')}.`;

    return new LintIssue(lintId, severity, nodeName, message);
  }

  return null;
};
