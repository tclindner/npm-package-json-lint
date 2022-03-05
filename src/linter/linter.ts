import path from 'path';
import {PackageJson} from 'type-fest';
import {Ignore} from 'ignore';
import {Rules} from '../native-rules';
import {parseJsonFile} from '../file-parser';
import {LintIssue} from '../lint-issue';
import {RuleType} from '../types/rule-type';
import {Severity} from '../types/severity';
import {aggregateCountsPerFile, aggregateOverallCounts, OverallAggregatedResultCounts} from './results-helper';
import {Config} from '../configuration';
import {PackageJsonFileLintingResult} from '../types/package-json-linting-result';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('npm-package-json-lint:linter');

export interface CreateResultObjectOptions {
  /**
   * The current working directory.
   */
  cwd: string;
  /**
   * An optional string representing the package.json file.
   */
  fileName: string;
  /**
   * A flag indicating that the file was skipped.
   */
  ignored: boolean;
  /**
   * A list of issues.
   */
  issues: LintIssue[];
  /**
   * Number of errors.
   */
  errorCount: number;
  /**
   * Number of warnings.
   */
  warningCount: number;
}

/**
 * Creates a results object.
 *
 * @param options A {@link CreateResultObjectOptions} object
 * @returns The lint results {@link PackageJsonFileLintingResult} for the package.json file.
 * @internal
 */
const createResultObject = (options: CreateResultObjectOptions): PackageJsonFileLintingResult => {
  const {cwd, fileName, ignored, issues, errorCount, warningCount} = options;

  return {
    filePath: `./${path.relative(cwd, fileName)}`,
    issues,
    ignored,
    errorCount,
    warningCount,
  };
};

/**
 * Runs configured rules against the provided package.json object.
 *
 * @param packageJsonData Valid package.json data
 * @param configObj Configuration object
 * @param rules Object of rule definitions
 * @return An array of {@link LintIssue} objects.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const lint = (packageJsonData: any, configObj, rules: Rules): LintIssue[] => {
  const lintIssues = [];

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const rule in configObj) {
    const ruleModule = rules.get(rule);

    let severity = Severity.Off;
    let ruleConfig;

    if (ruleModule.ruleType === RuleType.Array || ruleModule.ruleType === RuleType.Object) {
      severity = typeof configObj[rule] === 'string' && configObj[rule] === 'off' ? configObj[rule] : configObj[rule][0];
      ruleConfig = typeof configObj[rule] === 'string' ? {} : configObj[rule][1];
    } else if (ruleModule.ruleType === RuleType.OptionalObject) {
      if (typeof configObj[rule] === 'string') {
        severity = configObj[rule];
        ruleConfig = {};
      } else {
        // eslint-disable-next-line prefer-destructuring
        severity = configObj[rule][0];
        // eslint-disable-next-line prefer-destructuring
        ruleConfig = configObj[rule][1];
      }
    } else {
      severity = configObj[rule];
    }

    if (severity !== Severity.Off) {
      const lintResult = ruleModule.lint(packageJsonData, severity, ruleConfig);

      if (lintResult !== null) {
        lintIssues.push(lintResult);
      }
    }
  }

  return lintIssues;
};

/**
 * Processes package.json object
 *
 * @param cwd The current working directory.
 * @param packageJsonObj   An object representation of a package.json file.
 * @param config A config object.
 * @param fileName An optional string representing the package.json file.
 * @param rules An instance of `Rules`.
 * @returns A {@link PackageJsonFileLintingResult} object with the result of linting a package.json file.
 * @internal
 */
const processPackageJsonObject = (
  cwd: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonObj: PackageJson | any,
  // TODO: Type
  config,
  fileName: string,
  rules: Rules
): PackageJsonFileLintingResult => {
  const lintIssues = lint(packageJsonObj, config, rules);
  const counts = aggregateCountsPerFile(lintIssues);
  const result = createResultObject({
    cwd,
    fileName,
    ignored: false,
    issues: lintIssues,
    errorCount: counts.errorCount,
    warningCount: counts.warningCount,
  });

  return result;
};

/**
 * Processes a package.json file.
 *
 * @param cwd The current working directory.
 * @param fileName The filename of the file being linted.
 * @param config A config object.
 * @param rules An instance of `Rules`.
 * @returns A {@link PackageJsonFileLintingResult} object with the result of linting a package.json file.
 * @internal
 */
// TODO: Type
const processPackageJsonFile = (cwd: string, fileName: string, config, rules: Rules): PackageJsonFileLintingResult => {
  const packageJsonObj = parseJsonFile(path.resolve(fileName));

  return processPackageJsonObject(cwd, packageJsonObj, config, fileName, rules);
};

export interface LinterResult {
  results: LintIssue[];
  ignoreCount: number;
  /**
   * Number of errors for the package.json file.
   */
  errorCount: number;
  /**
   * Number of warnings for the package.json file.
   */
  warningCount: number;
}

export interface ExecuteOnPackageJsonObjectOptions {
  /**
   * The current working directory.
   */
  cwd: string;
  /**
   *  An object representation of a package.json file.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJsonObject: PackageJson | any;
  /**
   * An optional string representing the texts filename.
   */
  filename?: string;
  /**
   * An instance of the `ignore` module.
   */
  ignorer: Ignore;
  /**
   * An instance of {@Config}.
   */
  configHelper: Config;
  /**
   * An instance of {@link Rules}
   */
  rules: Rules;
}

export interface OverallLintingResult extends OverallAggregatedResultCounts {
  results: PackageJsonFileLintingResult[];
}

/**
 * Executes linter on package.json object
 *
 * @param options A {@link ExecuteOnPackageJsonObjectOptions} object
 * @returns The results {@link OverallLintingResult} from linting a collection of package.json files.
 */
export const executeOnPackageJsonObject = (options: ExecuteOnPackageJsonObjectOptions): OverallLintingResult => {
  const {cwd, packageJsonObject, filename, ignorer, configHelper, rules} = options;

  debug('executing on package.json object');
  const results = [];

  const filenameDefaulted = filename || '';
  const resolvedFilename = path.isAbsolute(filenameDefaulted) ? filenameDefaulted : path.resolve(cwd, filenameDefaulted);
  const relativeFilePath = path.relative(cwd, resolvedFilename);

  if (ignorer.ignores(relativeFilePath)) {
    debug(`Ignored: ${relativeFilePath}`);

    const result = createResultObject({
      cwd,
      fileName: resolvedFilename,
      ignored: true,
      issues: [],
      errorCount: 0,
      warningCount: 0,
    });

    results.push(result);
  } else {
    debug(`Getting config for ${resolvedFilename}`);
    const config = configHelper.getConfigForFile(resolvedFilename);

    debug(`Config fetched for ${resolvedFilename}`);
    const result = processPackageJsonObject(cwd, packageJsonObject, config, resolvedFilename, rules);

    results.push(result);
  }

  debug('Aggregating overall counts');
  const stats = aggregateOverallCounts(results);

  debug('stats');
  debug(stats);

  return {
    results,
    ignoreCount: stats.ignoreCount,
    errorCount: stats.errorCount,
    warningCount: stats.warningCount,
  };
};

export interface ExecuteOnPackageJsonFilesOptions {
  /**
   * The current working directory.
   */
  cwd: string;
  /**
   * An array of files and directory names.
   */
  fileList: string[];
  /**
   * An instance of the `ignore` module.
   */
  ignorer: Ignore;
  /**
   * An instance of {@Config}.
   */
  configHelper: Config;
  /**
   * An instance of {@link Rules}
   */
  rules: Rules;
}

/**
 * Executes the current configuration on an array of file and directory names.
 * @param options A {@link ExecuteOnPackageJsonFilesOptions} object
 * @returns The results {@link OverallLintingResult} from linting a collection of package.json files.
 */
export const executeOnPackageJsonFiles = (options: ExecuteOnPackageJsonFilesOptions): OverallLintingResult => {
  const {cwd, fileList, ignorer, configHelper, rules} = options;

  debug('executing on package.json files');
  const results = fileList.map((filePath) => {
    const relativeFilePath = path.relative(cwd, filePath);

    if (ignorer.ignores(relativeFilePath)) {
      debug(`Ignored: ${relativeFilePath}`);

      return createResultObject({
        cwd,
        fileName: filePath,
        ignored: true,
        issues: [],
        errorCount: 0,
        warningCount: 0,
      });
    }

    debug(`Getting config for ${filePath}`);
    const config = configHelper.getConfigForFile(filePath);

    debug(`Config fetched for ${filePath}`);

    return processPackageJsonFile(cwd, filePath, config, rules);
  });

  debug('Aggregating overall counts');
  const stats = aggregateOverallCounts(results);

  debug('stats');
  debug(stats);

  return {
    results,
    ignoreCount: stats.ignoreCount,
    errorCount: stats.errorCount,
    warningCount: stats.warningCount,
  };
};
