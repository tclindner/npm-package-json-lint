/* eslint guard-for-in: 'off', no-restricted-syntax: 'off', prefer-destructuring: 'off' */

const debug = require('debug')('npm-package-json-lint:linter');
const path = require('path');
const Parser = require('../Parser');
const resultsHelper = require('./resultsHelper');

/**
 * A package.json file linting result.
 * @typedef {Object} FileLintResult
 * @property {string}       filePath      The path to the file that was linted.
 * @property {LintIssue[]}  issues        An array of LintIssues from the run.
 * @property {boolean}      ignored       A flag indicated whether the file was ignored or not.
 * @property {number}       errorCount    Number of errors for the package.json file.
 * @property {number}       warningCount  Number of warnings for the package.json file.
 */

/**
 * Creates a results object.
 *
 * @param {string} cwd The current working directory.
 * @param {string} fileName An optional string representing the package.json file.
 * @param {boolean} ignored A flag indicating that the file was skipped.
 * @param {LintIssue[]} issues A list of issues.
 * @param {number} errorCount Number of errors.
 * @param {number} warningCount Number of warnings.
 * @returns {FileLintResult} The lint results {@link FileLintResult} for the package.json file.
 * @private
 */
const createResultObject = ({cwd, fileName, ignored, issues, errorCount, warningCount}) => ({
  filePath: `./${path.relative(cwd, fileName)}`,
  issues,
  ignored,
  errorCount,
  warningCount,
});

/**
 * Runs configured rules against the provided package.json object.
 *
 * @param {Object} packageJsonData Valid package.json data
 * @param {Object} configObj       Configuration object
 * @param {Object} rules           Object of rule definitions
 * @return {LintIssue[]} An array of {@link LintIssue} objects.
 * @private
 */
const lint = (packageJsonData, configObj, rules) => {
  const lintIssues = [];

  for (const rule in configObj) {
    const ruleModule = rules.get(rule);

    let severity = 'off';
    let ruleConfig = {};

    if (ruleModule.ruleType === 'array' || ruleModule.ruleType === 'object') {
      severity = typeof configObj[rule] === 'string' && configObj[rule] === 'off' ? configObj[rule] : configObj[rule][0];
      ruleConfig = typeof configObj[rule] === 'string' ? {} : configObj[rule][1];
    } else if (ruleModule.ruleType === 'optionalObject') {
      if (typeof configObj[rule] === 'string') {
        severity = configObj[rule];
        ruleConfig = {};
      } else {
        severity = configObj[rule][0];
        ruleConfig = configObj[rule][1];
      }
    } else {
      severity = configObj[rule];
    }

    if (severity !== 'off') {
      const lintResult = ruleModule.lint(packageJsonData, severity, ruleConfig);

      if (typeof lintResult === 'object') {
        lintIssues.push(lintResult);
      }
    }
  }

  return lintIssues;
};

/**
 * Processes package.json object
 *
 * @param {string} cwd The current working directory.
 * @param {Object} packageJsonObj   An object representation of a package.json file.
 * @param {Object} config A config object.
 * @param {String} fileName An optional string representing the package.json file.
 * @param {Object} rules An instance of `Rules`.
 * @returns {FileLintResult} A {@link FileLintResult} object with the result of linting a package.json file.
 * @private
 */
const processPackageJsonObject = (cwd, packageJsonObj, config, fileName, rules) => {
  const lintIssues = lint(packageJsonObj, config, rules);
  const counts = resultsHelper.aggregateCountsPerFile(lintIssues);
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
 * @param {string} cwd The current working directory.
 * @param {string} fileName The filename of the file being linted.
 * @param {Object} config A config object.
 * @param {Object} rules An instance of `Rules`.
 * @returns {FileLintResult} A {@link FileLintResult} object with the result of linting a package.json file.
 * @private
 */
const processPackageJsonFile = (cwd, fileName, config, rules) => {
  const packageJsonObj = Parser.parseJsonFile(path.resolve(fileName));

  return processPackageJsonObject(cwd, packageJsonObj, config, fileName, rules);
};

/**
 * Linting results for a collection of package.json files.
 * @typedef {Object} LinterResult
 * @property {FileLintResult[]} results An array of LintIssues from the run.
 * @property {number} ignoreCount   A flag indicated whether the file was ignored or not.
 * @property {number} errorCount    Number of errors for the package.json file.
 * @property {number} warningCount  Number of warnings for the package.json file.
 */

/**
 * Executes linter on package.json object
 *
 * @param {string} cwd The current working directory.
 * @param {Object} packageJsonObj An object representation of a package.json file.
 * @param {string} filename An optional string representing the texts filename.
 * @param {Object} ignorer An instance of the `ignore` module.
 * @param {Object} configHelper An instance of `Config`.
 * @param {Object} rules An instance of `Rules`.
 * @returns {LinterResult} The results {@link LinterResult} from linting a collection of package.json files.
 */
const executeOnPackageJsonObject = ({cwd, packageJsonObject, filename, ignorer, configHelper, rules}) => {
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
  const stats = resultsHelper.aggregateOverallCounts(results);

  debug('stats');
  debug(stats);

  return {
    results,
    ignoreCount: stats.ignoreCount,
    errorCount: stats.errorCount,
    warningCount: stats.warningCount,
  };
};

/**
 * Executes the current configuration on an array of file and directory names.
 * @param {string} cwd The current working directory.
 * @param {string[]} fileList An array of files and directory names.
 * @param {Object} ignorer An instance of the `ignore` module.
 * @param {Object} configHelper An instance of `Config`.
 * @param {Object} rules An instance of `Rules`.
 * @returns {LinterResult} The results {@link LinterResult} from linting a collection of package.json files.
 */
const executeOnPackageJsonFiles = ({cwd, fileList, ignorer, configHelper, rules}) => {
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
  const stats = resultsHelper.aggregateOverallCounts(results);

  debug('stats');
  debug(stats);

  return {
    results,
    ignoreCount: stats.ignoreCount,
    errorCount: stats.errorCount,
    warningCount: stats.warningCount,
  };
};

module.exports = {
  executeOnPackageJsonObject,
  executeOnPackageJsonFiles,
};
