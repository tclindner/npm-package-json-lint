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
  // step 1 - filter out empty entries
  const filteredPatterns = patterns.filter(pattern => pattern.length);

  // step 2 - convert directories to globs
  const globPatterns = filteredPatterns.map(pattern => {
    return pattern.endsWith(`${path.sep}package.json`) ? pattern : `${pattern}${path.sep}package.json`;
  });

  debug('globPatterns');
  debug(globPatterns);

  const files = [];
  const addedFiles = new Set();

  const globFiles = globby.sync(globPatterns, {
    cwd,
    gitignore: true
  });

  debug('globFiles');
  debug(globFiles);

  globFiles.forEach(globFile => {
    const filePath = path.resolve(cwd, globFile);

    if (addedFiles.has(filePath)) {
      return;
    }

    addedFiles.add(filePath);
    files.push(filePath);
  });

  debug('files');
  debug(files);

  return files;
};

module.exports = getFileList;
