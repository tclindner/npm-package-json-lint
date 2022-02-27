import fs from 'fs';
import stripComments from 'strip-json-comments';

/**
 * Require JavaScript file
 *
 * @param fileName String file path of file to load
 * @internal
 */
// eslint-disable-next-line import/no-dynamic-require, global-require
const requireFile = (fileName: string): NodeRequire => require(fileName);

/**
 * Sychronously reads file from file system
 *
 * @param fileName String file path of file to load
 * @internal
 */
const readFile = (fileName: string): string => fs.readFileSync(fileName, 'utf8').replace(/^\uFEFF/, '');

/**
 * Helper method for throwing errors when file fails to load.
 *
 * @param fileName Name of the file that failed to load.
 * @param err Error object
 * @throws {Error}
 * @internal
 */
const handleError = (fileName: string, err: Error): void => {
  throw new Error(`Failed to read config file: ${fileName}. \nError: ${err.message}`);
};

export const sourceSymbol = Symbol('JSON source');

/**
 * Parse a JSON file
 *
 * @param fileName String file path of file to load
 * @return Valid JSON
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJsonFile = (fileName: string): Record<string, any> => {
  let json = {};
  let fileContents = '';

  try {
    fileContents = readFile(fileName);

    json = JSON.parse(stripComments(fileContents));
  } catch (error) {
    handleError(fileName, error);
  }

  Object.defineProperty(json, sourceSymbol, {
    value: fileContents,
    enumerable: false,
    writable: false,
    configurable: false,
  });

  return json;
};

/**
 * Parse a JavaScript file
 *
 * @param fileName String file path of file to load
 * @return Valid JavaScript object
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseJavaScriptFile = (fileName: string): Record<string, any> => {
  let obj = {};

  try {
    obj = requireFile(fileName);
  } catch (error) {
    handleError(fileName, error);
  }

  return obj;
};
