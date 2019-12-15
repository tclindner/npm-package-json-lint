const Parser = require('../Parser');
const {findDuplicatePropNames} = require('../validators/property');
const LintIssue = require('./../LintIssue');

const lintId = 'no-duplicate-fields';
const nodeName = '';
const ruleType = 'optionalObject';

const lint = (packageJsonData, severity) => {
  /**
   * If we send package json straight to npm-package-json-lint, fallback to empty string.
   * Because we already lose information about duplicate properties.
   */
  const source = packageJsonData[Parser.sourceSymbol] || '';
  const dupProps = findDuplicatePropNames(source);

  if (dupProps.length) {
    const message = `You have duplicate field names: ${dupProps.join(', ')}. Please remove duplicates.`;

    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType
};
