import isPlainObj from 'is-plain-obj';
import slash from 'slash';
import {PackageJson} from 'type-fest';
import {Config} from './configuration';
import {Rules} from './native-rules';
import {executeOnPackageJsonFiles, executeOnPackageJsonObject, OverallLintingResult} from './linter/linter';
import {getFileList} from './utils/getFileList';
import {getIgnorer} from './utils/getIgnorer';
import {Severity} from './types/severity';
import {PackageJsonFileLintingResult} from './types/package-json-linting-result';
import {LintIssue} from './lint-issue';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const debug = require('debug')('npm-package-json-lint:NpmPackageJsonLint');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require('../package.json');

const noIssues = 0;

/**
 * Checks if the given issue is an error issue.
 *
 * @param issue A {@link LintIssue} object
 * @returns True if error, false if warning.
 * @private
 */
const isIssueAnError = (issue: LintIssue): boolean => issue.severity === Severity.Error;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPackageJsonObjectValid = (packageJsonObject: PackageJson | any): boolean => isPlainObj(packageJsonObject);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const areRequiredOptionsValid = (packageJsonObject: PackageJson | any, patterns: string[]): boolean =>
  (!patterns && !isPackageJsonObjectValid(packageJsonObject)) ||
  (patterns && (packageJsonObject || isPackageJsonObjectValid(packageJsonObject)));

/**
 * Filters results to only include errors.
 *
 * @param results The results to filter.
 * @returns The filtered results.
 */
const getErrorResults = (results: PackageJsonFileLintingResult[]): PackageJsonFileLintingResult[] => {
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

export interface NpmPackageJsonLintOptions {
  cwd?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonObject?: any;
  packageJsonFilePath?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configFile?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configBaseDirectory?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patterns?: any;
  quiet?: boolean;
  ignorePath?: string;
  fix?: boolean;
}

export class NpmPackageJsonLint {
  cwd: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonObject: any;

  packageJsonFilePath: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patterns: any;

  quiet: boolean;

  ignorePath: string;

  fix: boolean;

  version: string;

  rules: Rules;

  configHelper: Config;

  /**
   * constructor
   * @param options An instance of the {@link NpmPackageJsonLintOptions} options object.
   * @constructor
   */
  constructor(options: NpmPackageJsonLintOptions) {
    const {
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
    } = options;

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
   * @returns The results {@link OverallLintingResult} from linting a collection of package.json files.
   */
  lint(): OverallLintingResult {
    debug('Starting lint');

    if (areRequiredOptionsValid(this.packageJsonObject, this.patterns)) {
      throw new Error(
        'You must pass npm-package-json-lint a `patterns` glob or a `packageJsonObject` string, though not both.',
      );
    }

    const ignorer = getIgnorer(this.cwd, this.ignorePath);
    let linterOutput: OverallLintingResult;

    if (this.patterns) {
      debug('Linting using patterns');

      if (!Array.isArray(this.patterns)) {
        throw new TypeError('Patterns must be an array.');
      }

      const fileList = getFileList(this.patterns, this.cwd);

      linterOutput = executeOnPackageJsonFiles({
        cwd: this.cwd,
        fileList,
        ignorer,
        configHelper: this.configHelper,
        rules: this.rules,
      });
    } else {
      debug('Linting using passed object.');
      linterOutput = executeOnPackageJsonObject({
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
