const debug = require('debug')('npm-package-json-lint:getIgnorer');
import fs from 'fs';
import path from 'path';
import ignore from 'ignore';

const DEFAULT_IGNORE_FILENAME = '.npmpackagejsonlintignore';
const FILE_NOT_FOUND_ERROR_CODE = 'ENOENT';

/**
 * Generates ignorer based on ignore file content.
 *
 * @param {string} cwd        Current work directory.
 * @param {string} ignorePath Ignore path.
 * @returns {Object}          Ignorer
 */
export const getIgnorer = (cwd, ignorePath) => {
  const ignoreFilePath = ignorePath || DEFAULT_IGNORE_FILENAME;

  debug(`ignoreFilePath: ${ignoreFilePath}`);
  const absoluteIgnoreFilePath = path.isAbsolute(ignoreFilePath) ? ignoreFilePath : path.resolve(cwd, ignoreFilePath);

  debug(`absoluteIgnoreFilePath: ${absoluteIgnoreFilePath}`);
  let ignoreText = '';

  try {
    ignoreText = fs.readFileSync(absoluteIgnoreFilePath, 'utf8');
  } catch (readError) {
    if (readError.code !== FILE_NOT_FOUND_ERROR_CODE) {
      throw readError;
    }
  }

  debug('Ignore text added');

  return ignore().add(ignoreText);
};
