'use strict';

const isVersionAbsolute = require('./../validators/dependency-audit').isVersionAbsolute;
const LintIssue = require('./../LintIssue');
const lintId = 'no-absolute-version-devDependencies';
const nodeName = 'devDependencies';
const message = 'You are using an invalid version range. Please do not use absolute versions.';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {

  if (packageJsonData.hasOwnProperty(nodeName) && isVersionAbsolute(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
