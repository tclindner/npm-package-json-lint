import path from 'node:path';
import globby from 'globby';
import {slash} from './slash';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const debug = require('debug')('npm-package-json-lint:getFileList');

const GLOB_CHARS = /[!()*+?@[\]{}]/;

/**
Splits a glob pattern into its static base directory and the rest of the pattern.

@param pattern A glob pattern with forward slashes
@returns The static base and the pattern relative to it
*/
const splitGlobBase = (pattern: string): {base: string; rest: string} => {
  const segments = pattern.split('/');
  const firstGlobIndex = segments.findIndex((segment) => GLOB_CHARS.test(segment));
  const baseSegments = segments.slice(0, firstGlobIndex === -1 ? -1 : firstGlobIndex);
  const restSegments = segments.slice(baseSegments.length);

  return {base: `${baseSegments.join('/')}/`, rest: restSegments.join('/')};
};

/**
Determines whether a pattern points outside of cwd (e.g. `../sibling`).

@param pattern A glob pattern
@param cwd     The current working directory
@returns True if the pattern resolves outside of cwd
*/
const isOutsideCwd = (pattern: string, cwd: string): boolean => {
  const relative = path.relative(cwd, path.resolve(cwd, pattern));

  return relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative);
};

/**
Globs a pattern that points outside of cwd from its own static base directory.
globby's gitignore filter only accepts paths inside its cwd, so these can't share the main glob.

@param pattern A glob pattern that resolves outside of cwd
@param cwd     The current working directory
@returns Absolute paths of the matching files
*/
const globOutsideCwd = (pattern: string, cwd: string): string[] => {
  const {base, rest} = splitGlobBase(slash(path.resolve(cwd, pattern)));

  return globby.sync([rest, '!**/node_modules/**'], {
    cwd: base,
    gitignore: true,
    absolute: true,
  });
};

/**
Generates a list of files to lint based on a list of provided patterns

@param {Array<string>} patterns An array of patterns
@param {string}        cwd      The current working directory.
@returns {Array<string>} An array a files to lint.
*/
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getFileList = (patterns, cwd) => {
  debug('patterns');
  debug(patterns);

  // step 1 - filter out empty entries
  const filteredPatterns = patterns.filter((pattern) => pattern.length);

  debug('filteredPatterns');
  debug(filteredPatterns);

  // step 2 - convert directories to globs
  const globPatterns = filteredPatterns.map((pattern) =>
    pattern.endsWith(`/package.json`) ? pattern : `${pattern}/**/package.json`,
  );

  // step 3 - glob patterns outside of cwd (e.g. `../sibling`) separately, see `globOutsideCwd`
  const insidePatterns = globPatterns.filter((pattern) => pattern.startsWith('!') || !isOutsideCwd(pattern, cwd));
  const outsidePatterns = globPatterns.filter((pattern) => !pattern.startsWith('!') && isOutsideCwd(pattern, cwd));

  debug('insidePatterns');
  debug(insidePatterns);
  debug('outsidePatterns');
  debug(outsidePatterns);

  const hasInsidePatterns = insidePatterns.some((pattern) => !pattern.startsWith('!'));
  const globFiles = [
    ...(hasInsidePatterns
      ? globby.sync([...insidePatterns, '!**/node_modules/**'], {cwd, gitignore: true, absolute: true})
      : []),
    ...outsidePatterns.flatMap((pattern) => globOutsideCwd(pattern, cwd)),
  ];

  debug('globFiles');
  debug(globFiles);

  // step 4 - normalize and de-duplicate, keeping the first occurrence of each file
  const files = [...new Set(globFiles.map((globFile) => path.resolve(globFile)))];

  debug('Final file list from `getFileList`');
  debug(files);

  return files;
};
