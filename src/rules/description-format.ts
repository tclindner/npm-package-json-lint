import {isString} from '../validators/type';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {PackageJson} from 'type-fest';

const lintId = 'description-format';
const nodeName = 'description';
export const ruleType = RuleType.Object;

// eslint-disable-next-line complexity
export const lint = (packageJsonData: PackageJson, severity: Severity, config: any): LintIssue | boolean => {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
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
      `The description should start with a capital letter. It currently starts with ${description[0]}.`
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

  return true;
};
