const debug = require('debug')('npm-package-json-lint:NpmPackageJsonLint');
const pkg = require('../package.json');
import isPlainObj from 'is-plain-obj';
import slash from 'slash';
import {Config} from './Config';
import {Rules} from './Rules';
import {linter} from './linter/linter';
import {getFileList} from './utils/getFileList';
import {getIgnorer} from './utils/getIgnorer';

const noIssues = 0;

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

const isPackageJsonObjectValid = (packageJsonObject) => isPlainObj(packageJsonObject);

const areRequiredOptionsValid = (packageJsonObject, patterns) => {
  return (
    (!patterns && !isPackageJsonObjectValid(packageJsonObject)) ||
    (patterns && (packageJsonObject || isPackageJsonObjectValid(packageJsonObject)))
  );
};

/**
 * Filters results to only include errors.
 *
 * @param {LintResult[]} results The results to filter.
 * @returns {LintResult[]} The filtered results.
 */
const getErrorResults = (results) => {
  const filtered = [];

  results.forEach((result) => {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    const filteredIssues = result.issues.filter(isIssueAnError);

    if (filteredIssues.length > noIssues) {
      const filteredResult = {
        issues: filteredIssues,
        errorCount: filteredIssues.length,
        warningCount: 0,
      };

      filtered.push(Object.assign(result, filteredResult));
    }
  });

  return filtered;
};

/**
 * CLIEngine configuration object
 *
 * @typedef {Object} NpmPackageJsonLint
 * @property {string}   configFile      The configuration file to use.
 * @property {string}   cwd             The value to use for the current working directory.
 * @property {boolean}  useConfigFiles  False disables use of .npmpackagejsonlintrc.json files, npmpackagejsonlint.config.js files, and npmPackageJsonLintConfig object in package.json file.
 * @property {Object<string,*>} rules   An object of rules to use.
 */

/**
 * Public CLIEngine class
 * @class
 */
export class NpmPackageJsonLint {
  /**
   * constructor
   * @param {NpmPackageJsonLint} options The options for the CLIEngine.
   * @constructor
   */
  constructor({
    cwd,
    packageJsonObject,
    packageJsonFilePath,
    config,
    configFile,
    configBaseDirectory,
    patterns,
    quiet,
    ignorePath,
    fix,
  }) {
    this.cwd = slash(cwd || process.cwd());

    this.packageJsonObject = packageJsonObject;
    this.packageJsonFilePath = packageJsonFilePath ? slash(packageJsonFilePath) : packageJsonFilePath;
    this.patterns = patterns;
    this.quiet = quiet || false;
    this.ignorePath = ignorePath || '';
    this.fix = fix || false;

    this.version = pkg.version;

    this.rules = new Rules();
    this.rules.load();

    this.configHelper = new Config(this.cwd, config, configFile, configBaseDirectory, this.rules);
  }

  /**
   * Runs the linter using the config specified in the constructor
   *
   * @returns {LinterResult} The results {@link LinterResult} from linting a collection of package.json files.
   * @memberof NpmPackageJsonLint
   */
  lint() {
    debug('Starting lint');

    if (areRequiredOptionsValid(this.packageJsonObject, this.patterns)) {
      throw new Error(
        'You must pass npm-package-json-lint a `patterns` glob or a `packageJsonObject` string, though not both.'
      );
    }

    const ignorer = getIgnorer(this.cwd, this.ignorePath);
    let linterOutput;

    if (this.patterns) {
      debug('Linting using patterns');

      if (!Array.isArray(this.patterns)) {
        throw new TypeError('Patterns must be an array.');
      }

      const fileList = getFileList(this.patterns, this.cwd);

      linterOutput = linter.executeOnPackageJsonFiles({
        cwd: this.cwd,
        fileList,
        ignorer,
        configHelper: this.configHelper,
        rules: this.rules,
      });
    } else {
      debug('Linting using passed object.');
      linterOutput = linter.executeOnPackageJsonObject({
        cwd: this.cwd,
        packageJsonObject: this.packageJsonObject,
        ignorer,
        filename: this.packageJsonFilePath,
        configHelper: this.configHelper,
        rules: this.rules,
      });
    }

    if (this.quiet) {
      const errorsOnly = getErrorResults(linterOutput.results);

      return {
        results: errorsOnly,
        ignoreCount: linterOutput.ignoreCount,
        errorCount: linterOutput.errorCount,
        warningCount: linterOutput.warningCount,
      };
    }

    debug('lint complete');

    return linterOutput;
  }
}
