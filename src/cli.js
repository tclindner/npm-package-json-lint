#!/usr/bin/env node
'use strict';

/* eslint-disable no-process-exit */

const chalk = require('chalk');
const meow = require('meow');
const CLIEngine = require('./CLIEngine');
const Reporter = require('./Reporter');

const exitCodes = {
  zeroClean: 0,
  oneMissingTarget: 1,
  twoLintErrorsDetected: 2,
  runTimeException: 3
};

// configure cli
const cli = meow(`
      Usage
        $ npmPkgJsonLint <patterns>

      Options
        --quiet, -q Report errors only
        --noConfigFiles, -ncf Disables use of .npmpackagejsonlintrc.json files, npmpackagejsonlint.config.js files, and npmPackageJsonLintConfig object in package.json file.
        --configFile, -c File path of .npmpackagejsonlintrc.json

      Examples
        $ npmPkgJsonLint --version
        $ npmPkgJsonLint .
        $ npmPkgJsonLint ./packages
        $ npmPkgJsonLint ./package1 ./package2
        $ npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
        $ npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
        $ npmPkgJsonLint -q .
        $ npmPkgJsonLint --quiet ./packages
`, {
  flags: {
    quiet: {
      'type': 'boolean',
      'alias': 'q',
      'default': false
    },
    noConfigFiles: {
      'type': 'boolean',
      'alias': 'ncf',
      'default': false
    },
    configFile: {
      'type': 'string',
      'alias': 'c',
      'default': ''
    }
  }
});

const {input} = cli;

// Validate
const noPatternsProvided = 0;
const patterns = input;

if (patterns.length === noPatternsProvided) {
  console.log(chalk.red.bold('No lint targets provided'));
  process.exit(exitCodes.oneMissingTarget);
}

// CLI Options
const quiet = cli.flags.quiet;

// CLIEngine Options
const cliEngineOptions = {
  configFile: cli.flags.configFile,
  cwd: process.cwd(),
  useConfigFiles: !cli.flags.noConfigFiles,
  rules: {}
};

try {
  let exitCode = exitCodes.zeroClean;
  const noIssues = 0;

  const cliEngine = new CLIEngine(cliEngineOptions);
  const cliEngineOutput = cliEngine.executeOnPackageJsonFiles(patterns);

  if (quiet) {
    cliEngineOutput.results = CLIEngine.getErrorResults(cliEngineOutput.results);
  }

  Reporter.write(cliEngineOutput, quiet);

  if (cliEngineOutput.errorCount > noIssues) {
    exitCode = exitCodes.twoLintErrorsDetected;
  }

  process.exit(exitCode);
} catch (err) {
  console.log(chalk.red.bold(err.message));
  process.exit(exitCodes.runTimeException);
}
