const LintIssue = require('../LintIssue');
const {isString} = require('../validators/type');

const lintId = 'description-format';
const nodeName = 'description';
const ruleType = 'object';

// eslint-disable-next-line complexity
const lint = (packageJsonData, severity, config) => {
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

module.exports = {
  lint,
  ruleType,
};
