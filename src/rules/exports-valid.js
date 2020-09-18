const isPlainObj = require('is-plain-obj');
const LintIssue = require('../LintIssue');
const {exists} = require('../validators/property');

const lintId = 'exports-valid';
const nodeName = 'exports';
const ruleType = 'standard';

const isValidPathKey = (key) => key.startsWith('.') || key.startsWith('./');

const isValidPath = (value) => value.startsWith('./');

const validateFallbacks = (fallbacks) => {
  if (fallbacks.length === 0) return {error: 'fallbackEmpty'};

  const {validIndexes, invalidIndexes, hasNonString, invalidFollowingValid} = fallbacks.reduce(
    (acc, cur, i) => {
      if (typeof cur === 'string') {
        const isValid = isValidPath(cur);

        acc[isValid ? 'validIndexes' : 'invalidIndexes'].push(i);
        if (!isValid && acc.validIndexes.length) {
          acc.invalidFollowingValid = true;
        }
      } else {
        acc.hasNonString = true;
      }

      return acc;
    },
    {validIndexes: [], invalidIndexes: [], hasNonString: false}
  );

  if (validIndexes.length === 0) {
    return {error: 'fallbackNoValidPath'};
  }

  if (invalidIndexes.length === 0) {
    return {error: 'fallbackNoInvalids'};
  }

  if (validIndexes.length > 1) {
    return {error: 'fallbackUnreachableValid'};
  }

  if (invalidFollowingValid) {
    return {error: 'fallbackUnreachableInvalid'};
  }

  if (hasNonString) {
    return {error: 'fallbackHasNonString'};
  }

  return true;
};

// eslint-disable-next-line max-lines-per-function
const lint = (packageJsonData, severity, config = {conditions: []}) => {
  const conditions = [...(config.conditions || []), 'default'];

  if (!exists(packageJsonData, nodeName)) return true;

  // eslint-disable-next-line complexity,max-statements,max-lines-per-function
  const traverse = (parentKey, parentType, exports) => {
    if (typeof exports === 'string') {
      if (!isValidPath(exports)) {
        return {error: 'invalidPath', str: exports};
      }

      if (parentKey.endsWith('/') && !exports.endsWith('/')) {
        return {error: 'folderMappedToFile', str: parentKey};
      }

      return true;
    }

    if (Array.isArray(exports)) {
      // https://nodejs.org/api/esm.html#esm_package_exports_fallbacks
      // eslint-disable-next-line no-restricted-syntax
      return validateFallbacks(exports);
    }

    if (!isPlainObj(exports)) {
      return {error: 'unexpectedType', str: typeof exports};
    }

    // either a paths object or a conditions object
    let objectType;

    const entries = Object.entries(exports);

    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];

      if (isValidPathKey(key)) {
        if (objectType === 'conditions') {
          return {error: 'pathInConditions', str: key};
        }

        if (parentType === 'paths') {
          return {error: 'nestedPaths', str: parentKey};
        }

        objectType = 'paths';

        const result = traverse(key, objectType, value);

        if (result !== true) return result;
      } else {
        // `key` interpreted as a condition
        if (!conditions.includes(key)) {
          return {error: 'unsupportedCondition', str: key};
        }

        if (objectType === 'paths') {
          return {error: 'conditionInPaths', str: key};
        }

        objectType = 'conditions';
        if (key === 'default' && i + 1 < entries.length) {
          return {error: 'defaultConditionNotLast'};
        }

        const result = traverse(key, objectType, value);

        if (result !== true) return result;
      }
    }

    return true;
  };

  const result = traverse(nodeName, 'root', packageJsonData[nodeName]);

  if (result !== true) {
    const message = {
      invalidPath: `invalid path \`${result.str}\` must start with \`./\``,
      pathInConditions: `found path key \`${result.str}\` in a conditions object`,
      nestedPaths: `key \`${result.str}\` has paths object vaule but only conditions may be nested`,
      unsupportedCondition: `condition \`${result.str}\` not in supported conditions \`${conditions}\``,
      conditionInPaths: `found condition key \`${result.str}\` in a paths object`,
      unexpectedType: `unexpected \`${result.str}\``,
      defaultConditionNotLast: 'condition `default` must be the last key',
      folderMappedToFile: `the value of the folder mapping key \`${result.str}\` must end with \`/\``,
      fallbackEmpty: 'empty fallback array',
      fallbackNoValidPath: 'fallback array has no valid path',
      fallbackNoInvalids: 'fallback array has no invalid values',
      fallbackUnreachableValid: 'fallback array has multiple valid paths',
      fallbackUnreachableInvalid: 'found invalid value following a valid path',
      fallbackHasNonString: 'fallback array must have only strings',
    }[result.error];

    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports = {
  lint,
  ruleType,
};
