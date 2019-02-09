/* eslint max-lines-per-function: 'off', no-param-reassign: 'off' */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ignore = require('ignore');
const NpmPackageJsonLint = require('./NpmPackageJsonLint');
const Config = require('./Config');
const ConfigValidator = require('./config/ConfigValidator');
const Parser = require('./Parser');
const pkg = require('../package.json');

const DEFAULT_IGNORE_FILENAME = '.npmpackagejsonlintignore';
const FILE_NOT_FOUND_ERROR_CODE = 'ENOENT';

const noIssues = 0;

/**
 * CLIEngine configuration object
 *
 * @typedef {Object} CLIEngineOptions
 * @property {string}   configFile      The configuration file to use.
 * @property {string}   cwd             The value to use for the current working directory.
 * @property {boolean}  useConfigFiles  False disables use of .npmpackagejsonlintrc.json files, npmpackagejsonlint.config.js files, and npmPackageJsonLintConfig object in package.json file.
 * @property {Object<string,*>} rules   An object of rules to use.
 */

/**
 * A lint issue. It could be an error or a warning.
 * @typedef {Object} LintIssue
 * @param  {String} lintId      Unique, lowercase, hyphen-separate name for the lint
 * @param  {String} severity    'error' or 'warning'
 * @param  {String} node        Name of the node in the JSON the lint audits
 * @param  {String} lintMessage Human-friendly message to users
 */

/**
 * A linting result.
 * @typedef {Object} LintResult
 *
 * @property {String}       filePath      The path to the file that was linted.
 * @property {LintIssue[]}  issues        An array of LintIssues from the run.
 * @property {Number}       errorCount    Number of errors for the result.
 * @property {Number}       warningCount  Number of warnings for the result.
 */

/**
 * A result count object.
 * @typedef {Object} ResultCounts
 *
 * @property {Number}       errorCount    Number of errors for the result.
 * @property {Number}       warningCount  Number of warnings for the result.
 */

/**
 * Aggregates the count of errors and warning for a package.json file.
 *
 * @param   {LintIssue[]}   issues - Array of LintIssue object from a package.json file.
 * @returns {ResultCounts}  Counts object
 * @private
 */
const aggregateCountsPerFile = (issues) => {
  const incrementOne = 1;

  return issues.reduce((counts, issue) => {
    if (issue.severity === 'error') {
      counts.errorCount += incrementOne;
    } else {
      counts.warningCount += incrementOne;
    }

    return counts;
  }, {
    errorCount: 0,
    warningCount: 0
  });
};

/**
 * Aggregates the count of errors and warnings for all package.json files.
 *
 * @param   {LintResult[]} results  Array of LintIssue objects from all package.json files.
 * @returns {ResultCounts}          Counts object
 * @private
 */
const aggregateOverallCounts = (results) => {
  return results.reduce((counts, result) => {
    counts.errorCount += result.errorCount;
    counts.warningCount += result.warningCount;

    return counts;
  }, {
    errorCount: 0,
    warningCount: 0
  });
};

/**
 * Processes package.json object
 *
 * @param {Object} packageJsonObj   An object representation of a package.json file.
 * @param {Object} configHelper     The configuration context.
 * @param {String} fileName         An optional string representing the package.json file.
 * @param {NpmPackageJsonLint} linter NpmPackageJsonLint linter context
 * @returns {LintResult} The results for linting on this text.
 * @private
 */
const processPackageJsonObject = (packageJsonObj, configHelper, fileName, linter) => {
  let filePath;

  if (fileName) {
    filePath = path.resolve(fileName);
  }

  const effectiveFileName = fileName || '{}';

  const config = configHelper.get(filePath);

  const linterResult = linter.lint(packageJsonObj, config.rules);

  const counts = aggregateCountsPerFile(linterResult.issues);

  const result = {
    filePath: `./${path.relative(configHelper.options.cwd, effectiveFileName)}`,
    issues: linterResult.issues,
    errorCount: counts.errorCount,
    warningCount: counts.warningCount
  };

  return result;
};

/**
 * Processes a package.json file.
 *
 * @param {String}  fileName      The filename of the file being linted.
 * @param {Object}  configHelper  The configuration context.
 * @param {NpmPackageJsonLint} linter   Linter context
 * @returns {LintResult}    The linter results
 * @private
 */
const processPackageJsonFile = (fileName, configHelper, linter) => {
  const packageJsonObj = Parser.parseJsonFile(path.resolve(fileName));

  return processPackageJsonObject(packageJsonObj, configHelper, fileName, linter);
};

/**
 * Checks if the given issue is an error issue.
 *
 * @param {LintIssue} issue npm-package-json-lint issue
 * @returns {boolean} True if error, false if warning.
 * @private
 */
const isIssueAnError = (issue) => {
  return issue.severity === 'error';
};

/**
 * Generates ignorer based on ignore file content.
 *
 * @param {String}            cwd     Current work directory.
 * @param {CLIEngineOptions}  options CLIEngineOptions object.
 * @returns {Object}          Ignorer
 */
const getIgnorer = (cwd, options) => {
  const ignoreFilePath = options.ignorePath || DEFAULT_IGNORE_FILENAME;
  const absoluteIgnoreFilePath = path.isAbsolute(ignoreFilePath)
    ? ignoreFilePath
    : path.resolve(cwd, ignoreFilePath);
  let ignoreText = '';

  try {
    ignoreText = fs.readFileSync(absoluteIgnoreFilePath, 'utf8');
  } catch (readError) {
    if (readError.code !== FILE_NOT_FOUND_ERROR_CODE) {
      throw readError;
    }
  }

  return ignore().add(ignoreText);
};

/**
 * Generates a list of files to lint based on a list of provided patterns
 *
 * @param {Array<String>}     patterns An array of patterns
 * @param {CLIEngineOptions}  options  CLIEngineOptions object.
 * @returns {Array}           Files list
 */
const getFileList = (patterns, options) => {
  const cwd = (options && options.cwd) || process.cwd();

  // step 1 - filter out empty entries
  const filteredPatterns = patterns.filter((pattern) => pattern.length);

  // step 2 - convert directories to globs
  const globPatterns = filteredPatterns.map((pattern) => {
    const suffix = '/**/package.json';

    let newPath = pattern;
    const resolvedPath = path.resolve(cwd, pattern);

    if (fs.existsSync(resolvedPath)) {
      const fileStats = fs.statSync(resolvedPath);

      if (fileStats.isFile()) {
        if (resolvedPath.endsWith(`${path.sep}package.json`)) {
          newPath = resolvedPath;
        } else {
          throw new Error(`Pattern, ${pattern}, is a file, but isn't a package.json file.`);
        }
      } else if (fileStats.isDirectory()) {
        // strip trailing slash(es)
        newPath = newPath.replace(/[/\\]$/, '') + suffix;
      }
    } else {
      // string trailing /* (Any number of *s)
      newPath = newPath.replace(/[/][*]+$/, '') + suffix;
    }

    return newPath;
  });

  const files = [];
  const addedFiles = new Set();
  const ignorer = getIgnorer(cwd, options);

  globPatterns.forEach((pattern) => {
    const file = path.resolve(cwd, pattern);

    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      if (addedFiles.has(file) || ignorer.ignores(path.relative(cwd, file))) {
        return;
      }

      addedFiles.add(file);
      files.push(file);
    } else {
      const globOptions = {
        nodir: true,
        dot: false,
        cwd,
        ignore: 'node_modules'
      };

      let globFiles = glob.sync(pattern, globOptions);

      // remove node_module package.json files. Manually doing this instead of using glob ignore
      // because of https://github.com/isaacs/node-glob/issues/309
      globFiles = globFiles.filter((globFile) => !globFile.includes('node_modules'));

      globFiles.forEach((globFile) => {
        const filePath = path.resolve(cwd, globFile);

        if (addedFiles.has(filePath) || ignorer.ignores(path.relative(cwd, filePath))) {
          return;
        }

        addedFiles.add(filePath);
        files.push(filePath);
      });
    }
  });

  return files;
};

/**
 * Public CLIEngine class
 * @class
 */
class CLIEngine {

  /**
   * constructor
   * @param {CLIEngineOptions} passedOptions The options for the CLIEngine.
   * @constructor
   */
  constructor(passedOptions) {

    const options = Object.assign(Object.create(null), {cwd: process.cwd()}, passedOptions);

    this.options = options;
    this.version = pkg.version;
    this.linter = new NpmPackageJsonLint();

    if (this.options.rules && Object.keys(this.options.rules).length) {
      ConfigValidator.validateRules(this.options.rules, 'cli', this.linter);
    }

    this.config = new Config(this.options, this.linter);
  }

  /**
   * Gets rules from linter
   *
   * @returns {Object} Rules object containing the ruleId and path to rule module file.
   */
  getRules() {
    return this.linter.getRules();
  }

  /**
   * Filters results to only include errors.
   *
   * @param {LintResult[]} results The results to filter.
   * @returns {LintResult[]} The filtered results.
   */
  static getErrorResults(results) {
    const filtered = [];

    results.forEach((result) => {
      const filteredIssues = result.issues.filter(isIssueAnError);

      if (filteredIssues.length > noIssues) {
        const filteredResult = {
          issues: filteredIssues,
          errorCount: filteredIssues.length,
          warningCount: 0
        };

        filtered.push(Object.assign(result, filteredResult));
      }
    });

    return filtered;
  }

  /**
   * Executes the current configuration on an array of file and directory names.
   * @param {string[]} patterns An array of file and directory names.
   * @returns {Object} The results for all files that were linted.
   */
  executeOnPackageJsonFiles(patterns) {
    const fileList = getFileList(patterns, this.options);
    const results = fileList.map((filePath) => processPackageJsonFile(filePath, this.config, this.linter));
    const stats = aggregateOverallCounts(results);

    return {
      results,
      errorCount: stats.errorCount,
      warningCount: stats.warningCount
    };
  }

  /* eslint-disable id-length */
  /**
   * Executes linter on package.json object
   *
   * @param {Object} packageJsonObj An object representation of a package.json file.
   * @param {string} filename An optional string representing the texts filename.
   * @returns {Object} The results for the linting.
   */
  executeOnPackageJsonObject(packageJsonObj, filename) {
    const results = [];

    const resolvedFilename = filename && !path.isAbsolute(filename)
      ? path.resolve(this.options.cwd, filename)
      : filename;

    results.push(processPackageJsonObject(packageJsonObj, this.config, resolvedFilename, this.linter));

    const count = aggregateOverallCounts(results);

    return {
      results,
      errorCount: count.errorCount,
      warningCount: count.warningCount
    };
  }

  /**
   * Returns a configuration object for the given file using
   * npm-package-json-lint's configuration rules.
   *
   * @param {String} filePath The path of the file to get configuration for.
   * @returns {Object} A configuration object for the file.
   */
  getConfigForFile(filePath) {
    return this.config.get(filePath);
  }

}

module.exports = CLIEngine;
