import {PackageJson} from 'type-fest';
import {isString} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {LintResult} from '../types/lint-result';

const lintId = 'description-format';
const nodeName = 'description';

export const ruleType = RuleType.Object;

export const lint = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonData: PackageJson | any,
  severity: Severity,
  config: Record<string, boolean>,
): LintResult => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return null;
  }

  const {description} = packageJsonData;

  if (!isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, 'Type should be a string');
  }

  if (
    config.hasOwnProperty('requireCapitalFirstLetter') &&
    config.requireCapitalFirstLetter &&
    description.length > 0 &&
    description[0] !== description[0].toUpperCase()
  ) {
    return new LintIssue(
      lintId,
      severity,
      nodeName,
      `The description should start with a capital letter. It currently starts with ${description[0]}.`,
    );
  }

  if (config.hasOwnProperty('requireEndingPeriod') && config.hasOwnProperty('forbidEndingPeriod')) {
    throw new Error('description-format does not support `requireEndingPeriod` and `forbidEndingPeriod` being `true`.');
  }

  if (config.hasOwnProperty('requireEndingPeriod') && config.requireEndingPeriod && !description.endsWith('.')) {
    return new LintIssue(lintId, severity, nodeName, 'The description should end with a period.');
  }

  if (config.hasOwnProperty('forbidEndingPeriod') && config.forbidEndingPeriod && description.endsWith('.')) {
    return new LintIssue(lintId, severity, nodeName, 'The description should not end with a period.');
  }

  return null;
};
