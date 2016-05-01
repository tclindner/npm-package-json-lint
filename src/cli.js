#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const cliApp = require("commander");
const fs = require("fs");
const Parser = require("./Parser");
const path = require("path");
const pkg = require("./../package.json");
const NpmPackageJsonLint = require("./NpmPackageJsonLint");
const Reporter = require("./Reporter");
const userHome = require("user-home");

const DEFAULT_FILE_NAME = "./package.json";
const RC_FILE_NAME = ".npmpackagejsonlintrc";

/**
 * Error handler
 * @param  {String}     err   Error message
 * @return {undefined}        No return
 */
const handleError = function(err) {
  const exitCode = 1;

  console.log(chalk.red.bold(err));
  process.exitCode = exitCode;
  throw new Error(err);
};

// configure cli options
cliApp.version(pkg.version);
cliApp.usage(pkg.name);
cliApp.option("-f, --file <filePath>", `File path including name. Defaults to ${DEFAULT_FILE_NAME}`, DEFAULT_FILE_NAME);
cliApp.option("-r, --rule <rule name>", "Valid rule name to check. Defaults to nothing");
cliApp.option("-c, --rules-file <filePath>", "File path of .npmpackagejsonlintrc");
cliApp.option("-w, --ignore-warnings", "Ignore warnings");
cliApp.parse(process.argv);

// File to lint
const filePath = cliApp.file ? cliApp.file : DEFAULT_FILE_NAME;
const options = {
  ignoreWarnings: false
};

// Ignore warnings
if (cliApp.ignoreWarnings) {
  options.ignoreWarnings = true;
}

// Rules
let rulesLoaded = false;
let rulesConfig = {};

if (typeof cliApp.rule !== "undefined") {
  rulesConfig[cliApp.rule] = true;
  rulesLoaded = true;
}

if (typeof cliApp.rulesFile !== "undefined") {
  rulesConfig = cliApp.rulesFile;
  rulesLoaded = true;
}

// check if rules have been found. If no, then lets try to find a config file in
// the user's home directory
if (!rulesLoaded) {
  const userHomeRcFile = path.join(userHome, RC_FILE_NAME);

  if (fs.existsSync(userHomeRcFile)) {
    rulesConfig = userHomeRcFile;
  }
}

// Load file (package.json)
let fileData = null;

try {
  const parser = new Parser();

  fileData = parser.parse(filePath);

  const npmPackageJsonLint = new NpmPackageJsonLint(fileData, rulesConfig, options);
  const output = npmPackageJsonLint.lint();

  const reporter = new Reporter();

  for (const issueType in output) {
    const issues = output[issueType];

    reporter.write(output[issueType], issueType);
  }

  const formattedFileName = chalk.bold.green(filePath);

  console.log(`${formattedFileName} check complete`);
} catch (err) {
  handleError(err);
}
