'use strict';

const LintIssue = require('./../LintIssue');
const isString = require('./../validators/type').isString;
const lintId = 'description-format';
const nodeName = 'description';
const ruleType = 'object';

const lint = function(packageJsonData, severity, config) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return true;
  }

  const description = packageJsonData.description;

  if (!isString(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, 'Type should be a string');
  }

  if (config.hasOwnProperty('requireCapitalFirstLetter') && config.requireCapitalFirstLetter && description[0] !== description[0].toUpperCase()) {
    return new LintIssue(lintId, severity, nodeName, `The description should start with a capital letter. It currently starts with ${description[0]}.`);
  }

  if (config.hasOwnProperty('requireEndingPeriod') && config.requireEndingPeriod && !description.endsWith('.')) {
    return new LintIssue(lintId, severity, nodeName, 'The description should end with a period.');
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
