import path from 'node:path';
import {minimatch} from 'minimatch';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const debug = require('debug')('npm-package-json-lint:applyOverrides');

/**
 * Applies values from the 'overrides' field in a configuration file.
 * @param {string} cwd       The current working directory.
 * @param {string} filePath  The file path of the file being linted.
 * @param {Object} rules     Rules object
 * @param {Object} overrides Overrides object
 * @returns {Object} A new configuration object with all of the 'overrides' applied.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyOverrides = (cwd: string, filePath: string, rules: any, overrides?: any[]): any => {
  let finalRules = {...rules};

  debug('overrides');
  debug(overrides);

  if (overrides) {
    // Compute the relative path once and reuse across all override checks.
    // Normalize to forward slashes so patterns work consistently across platforms.
    // eslint-disable-next-line unicorn/prefer-string-replace-all
    const relativeFilePath = path.relative(cwd, filePath).replace(/\\/g, '/');

    overrides.forEach((override) => {
      const filteredPatterns = override.patterns.filter((pattern: string) => pattern.length);
      const transformedPatterns = filteredPatterns.map((pattern: string) =>
        pattern.endsWith(`/package.json`) ? pattern : `${pattern}/package.json`,
      );

      // Strip leading './' from patterns so they match the output of path.relative(),
      // which never includes a leading './'.
      const matches = transformedPatterns.some((pattern: string) =>
        minimatch(relativeFilePath, pattern.replace(/^\.\//, ''), {dot: true}),
      );

      debug('relativeFilePath: %s, patterns: %o, matches: %s', relativeFilePath, transformedPatterns, matches);

      if (matches) {
        finalRules = {...finalRules, ...override.rules};
      }
    });
  }

  debug('finalRules');
  debug(finalRules);

  return finalRules;
};
