import path from 'path';
import globby from 'globby';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const debug = require('debug')('npm-package-json-lint:applyOverrides');

/**
 * Applies values from the 'overrides' field in a configuration file.
 * @param {string} cwd       The current working directory.
 * @param {Object} filePath  The file path of the file being linted.
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
    overrides.forEach((override) => {
      const filteredPatterns = override.patterns.filter((pattern) => pattern.length);
      const transformedPatterns = filteredPatterns.map((pattern) =>
        pattern.endsWith(`/package.json`) ? pattern : `${pattern}/package.json`,
      );

      const globFiles = globby.sync(transformedPatterns, {
        cwd,
        gitignore: true,
      });

      debug('globFiles');
      debug(globFiles);
      globFiles.forEach((globFile) => {
        const globbedFilePath = path.resolve(cwd, globFile);

        if (filePath === globbedFilePath) {
          finalRules = {...finalRules, ...override.rules};
        }
      });
    });
  }

  debug('finalRules');
  debug(finalRules);

  return finalRules;
};
