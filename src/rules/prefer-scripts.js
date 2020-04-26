const {exists} = require('../validators/property');
const LintIssue = require('../LintIssue');

const lintId = 'prefer-scripts';
const nodeName = 'scripts';
const message = 'Your package.json scripts object must include:';
const ruleType = 'array';
const minItems = 1;

const lint = (packageJsonData, severity, requiredScripts) => {
  if (exists(packageJsonData, 'scripts')) {
    const scripts = Object.keys(packageJsonData.scripts);
    const allRequiredScriptsPresent = requiredScripts.every((requiredScript) => scripts.includes(requiredScript))

    if (!allRequiredScriptsPresent) {
      return new LintIssue(lintId, severity, nodeName, `${message} ${requiredScripts.join(', ')}.`);
    }
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
  minItems,
};
