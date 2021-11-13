const debug = require('debug')('npm-package-json-lint:applyOverrides');
const path = require('path');
const globby = require('globby');

/**
 * Applies values from the 'overrides' field in a configuration file.
 * @param {string} cwd       The current working directory.
 * @param {Object} filePath  The file path of the file being linted.
 * @param {Object} rules     Rules object
 * @param {Object} overrides Overrides object
 * @returns {Object} A new configuration object with all of the 'overrides' applied.
 * @private
 */
const applyOverrides = (cwd, filePath, rules, overrides) => {
  let finalRules = {...rules};

  debug('overrides');
  debug(overrides);

  if (overrides) {
    overrides.forEach((override) => {
      const filteredPatterns = override.patterns.filter((pattern) => pattern.length);
      const transformedPatterns = filteredPatterns.map((pattern) =>
        pattern.endsWith(`/package.json`) ? pattern : `${pattern}/package.json`
      );

      const globFiles = globby.sync(transformedPatterns, {
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

module.exports = applyOverrides;
