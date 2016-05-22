'use strict';

const isObject = require('./../validators/type').isObject;
const LintIssue = require('./../LintIssue');
const lintId = 'dependencies-type';
const nodeName = 'dependencies';
const message = 'Type should be an Object';
const ruleType = 'type';

const lint = function(packageJsonData, lintType) {
  if (!isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
