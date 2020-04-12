const debug = require('debug')('npm-package-json-lint:getFileList');
const path = require('path');
const globby = require('globby');

/**
 * Generates a list of files to lint based on a list of provided patterns
 *
 * @param {Array<string>} patterns An array of patterns
 * @param {string}        cwd      The current working directory.
 * @returns {Array<string>} An array a files to lint.
 */
const getFileList = (patterns, cwd) => {
  debug('patterns');
  debug(patterns);

  // step 1 - filter out empty entries
  const filteredPatterns = patterns.filter((pattern) => pattern.length);

  debug('filteredPatterns');
  debug(filteredPatterns);

  // step 2 - convert directories to globs
  const globPatterns = filteredPatterns.map((pattern) => {
    return pattern.endsWith(`/package.json`) ? pattern : `${pattern}/**/package.json`;
  });

  globPatterns.push('!node_modules');

  debug('globPatterns');
  debug(globPatterns);

  const files = [];
  const addedFiles = new Set();

  const globFiles = globby.sync(globPatterns, {
    cwd,
    gitignore: true,
  });

  debug('globFiles');
  debug(globFiles);

  globFiles.forEach((globFile) => {
    const filePath = path.resolve(cwd, globFile);

    if (addedFiles.has(filePath)) {
      return;
    }

    addedFiles.add(filePath);
    files.push(filePath);
  });

  debug('Final file list from `getFileList`');
  debug(files);

  return files;
};

module.exports = getFileList;
