const Parser = require('../Parser');
const {findDuplicatePropNames} = require('../validators/property');
const LintIssue = require('../LintIssue');

const lintId = 'no-duplicate-properties';
const nodeName = '';
const ruleType = 'standard';

const lint = (packageJsonData, severity) => {
  /**
   * If we send package json straight to npm-package-json-lint, fallback to empty string.
   * Because we already lose information about duplicate properties.
   */
  const source = packageJsonData[Parser.sourceSymbol] || '';
  const dupProps = findDuplicatePropNames(source);

  if (dupProps.length) {
    const message = `Duplicate properties detected. Please remove duplicates for: ${dupProps.join(', ')}.`;

    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
