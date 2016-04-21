#!/usr/bin/env node

"use strict";

let chalk = require("chalk");
let cliApp = require("commander");
let fs = require("fs");
let Parser = require("./Parser");
let path = require("path");
let pkg = require("./../package.json");
let NpmPackageJsonLint = require("./NpmPackageJsonLint");
let Reporter = require("./Reporter");
let userHome = require("user-home");

const DEFAULT_FILE_NAME = "./package.json";
const NPM_PACKAGE_JSON_RC_FILE_NAME = ".npmpackagejsonlintrc";

function handleError(err) {
  console.log(chalk.red.bold(err));
  process.exit(1);
}

// configure cli options
cliApp.version(pkg.version);
cliApp.usage(pkg.name);
cliApp.option("-f, --file <filePath>", `File path including name. Defaults to ${DEFAULT_FILE_NAME}`, DEFAULT_FILE_NAME);
cliApp.option("-r, --rule <rule name>", "Valid rule name to check. Defaults to nothing");
cliApp.option("-c, --rules-file <filePath>", "File path of .npmpackagejsonlintrc");
cliApp.option("-w, --ignore-warnings", "Ignore warnings");
cliApp.parse(process.argv);

// File to lint
let filePath = (cliApp.file) ? cliApp.file : DEFAULT_FILE_NAME;
let options = {
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
  let userHomeRcFile = path.join(userHome, NPM_PACKAGE_JSON_RC_FILE_NAME);

  if (fs.existsSync(userHomeRcFile)) {
    rulesConfig = userHomeRcFile;
  }
}

// Load file (package.json)
let fileData = null;

try {
  let parser = new Parser();
  fileData = parser.parse(filePath);

  let npmPackageJsonLint = new NpmPackageJsonLint(fileData, rulesConfig, options);
  let output = npmPackageJsonLint.lint();

  let reporter = new Reporter();

  for (let issueType in output) {
    let issues = output[issueType];

    reporter.write(output[issueType], issueType);
  }

  console.log(chalk.bold.green(filePath) + " check complete");
} catch (e) {
  handleError(e);
}
