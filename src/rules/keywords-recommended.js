"use strict";

const LintIssue = require("./../LintIssue");
const lintId = "keywords-recommended";
const lintType = "warning";
const nodeName = "keywords";
const message = "keywords is recommended";
const ruleType = "recommended";

const lint = function(packageJsonData) {
  if (!packageJsonData.hasOwnProperty(nodeName)) {
    return new LintIssue(lintId, lintType, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.lintType = lintType;
module.exports.ruleType = ruleType;
