'use strict';

const isVersionAbsolute = require('./../validators/dependency-audit').isVersionAbsolute;
const LintIssue = require('./../LintIssue');
const lintId = 'prefer-absolute-version-dependencies';
const nodeName = 'dependencies';
const message = 'You are using an invalid version range. Please use absolute versions.';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {

  if (!isVersionAbsolute(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
