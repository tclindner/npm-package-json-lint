#!/usr/bin/env node

import chalk from 'chalk';
import meow from 'meow';
import {NpmPackageJsonLint} from './npm-package-json-lint';
import {write} from './console-reporter';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const debug = require('debug')('npm-package-json-lint:cli');

const exitCodes = {
  zeroClean: 0,
  oneMissingTarget: 1,
  twoLintErrorsDetected: 2,
  runTimeException: 3,
  exceedMaxWarnings: 4,
};

// configure cli
const cli = meow(
  `
      Usage
        $ npmPkgJsonLint <patterns>

      Options
        --quiet, -q Report errors only
        --noConfigFiles, -ncf Disables use of .npmpackagejsonlintrc.json files, npmpackagejsonlint.config.js files, and npmpackagejsonlint object in package.json file.
        --configFile, -c File path of .npmpackagejsonlintrc.json
        --ignorePath, -i Path to a file containing patterns that describe files to ignore. The path can be absolute or relative to process.cwd(). By default, npm-package-json-lint looks for .npmpackagejsonlintignore in process.cwd().
        --maxWarnings, -mw Maximum number of warnings that can be detected before an error is thrown.
        --allowEmptyTargets Do not throw an error when a list of targets is empty.

      Examples
        $ npmPkgJsonLint --version
        $ npmPkgJsonLint .
        $ npmPkgJsonLint ./packages
        $ npmPkgJsonLint ./package1 ./package2
        $ npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
        $ npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
        $ npmPkgJsonLint -q .
        $ npmPkgJsonLint --quiet ./packages
        $ npmPkgJsonLint . --ignorePath .gitignore
        $ npmPkgJsonLint . -i .gitignore
        $ npmPkgJsonLint . --maxWarnings 10
        $ npmPkgJsonLint . -mw 10
`,
  {
    flags: {
      quiet: {
        type: 'boolean',
        alias: 'q',
        default: false,
      },
      noConfigFiles: {
        type: 'boolean',
        alias: 'ncf',
        default: false,
      },
      configFile: {
        type: 'string',
        alias: 'c',
        default: '',
      },
      ignorePath: {
        type: 'string',
        alias: 'i',
        default: '',
      },
      maxWarnings: {
        type: 'number',
        alias: 'mw',
        default: 10000000,
      },
      allowEmptyTargets: {
        type: 'boolean',
        default: false,
      },
    },
  },
);

const {input, flags} = cli;

// Validate
const noPatternsProvided = 0;
const patterns = input;

debug(`patterns: ${patterns}`);

if (patterns.length === noPatternsProvided) {
  debug(`No lint targets provided`);
  console.log(chalk.red.bold('No lint targets provided'));

  const exitCode = flags.allowEmptyTargets ? exitCodes.zeroClean : exitCodes.oneMissingTarget;

  process.exit(exitCode);
}

try {
  let exitCode = exitCodes.zeroClean;
  const noIssues = 0;

  debug(`Creating NpmPackageJsonLint instance`);
  const npmPackageJsonLint = new NpmPackageJsonLint({
    cwd: process.cwd(),
    configFile: flags.configFile,
    patterns,
    ignorePath: flags.ignorePath,
    quiet: flags.quiet,
  });
  const linterOutput = npmPackageJsonLint.lint();

  debug(`NpmPackageJsonLint.lint complete`);

  debug(`Reporter.write starting`);
  write(linterOutput, flags.quiet);
  debug(`Reporter.write complete`);

  if (linterOutput.warningCount > flags.maxWarnings) {
    debug(`Max warnings exceeded`);
    exitCode = exitCodes.exceedMaxWarnings;
  }

  if (linterOutput.errorCount > noIssues) {
    debug(`Lint errors detected`);
    exitCode = exitCodes.twoLintErrorsDetected;
  }

  process.exit(exitCode);
} catch (error) {
  console.log(chalk.red.bold(error.message));
  process.exit(exitCodes.runTimeException);
}
