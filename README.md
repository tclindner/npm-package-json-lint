# npm-package-json-lint

> A package.json linter for Node projects


[![license](https://img.shields.io/github/license/tclindner/npm-package-json-lint.svg?maxAge=2592000&style=flat-square)](https://github.com/tclindner/npm-package-json-lint/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/npm-package-json-lint)
![ci](https://github.com/tclindner/npm-package-json-lint/workflows/ci/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e76a30d9-13f0-4691-a49b-454570589de2/deploy-status)](https://app.netlify.com/sites/npmpackagejsonlint/deploys)

- [npm-package-json-lint](#npm-package-json-lint)
  * [What is npm-package-json-lint?](#what-is-npm-package-json-lint-)
  * [Install and Use](#install-and-use)
    + [System Dependencies](#system-dependencies)
      - [Node](#node)
    + [Use the cli](#use-the-cli)
      - [Use cli globally](#use-cli-globally)
      - [Use cli in project](#use-cli-in-project)
      - [Using the linter](#using-the-linter)
        * [From the command line](#from-the-command-line)
        * [In the program](#in-the-program)
  * [Custom Configuration](#custom-configuration)
  * [Local Development](#local-development)
  * [Documentation](#documentation)
  * [Migrating from v5.x.x to 6.x.x](#migrating-from-v5xx-to-6xx)
  * [Migrating from v4.x.x to 5.x.x](#migrating-from-v4xx-to-5xx)
  * [Migrating from v3.x.x to 4.x.x](#migrating-from-v3xx-to-4xx)
  * [Migrating from v2.x.x to 3.x.x](#migrating-from-v2xx-to-3xx)
  * [Migrating from v1.x.x to 2.x.x](#migrating-from-v1xx-to-2xx)
  * [Migrating from v0.x.x to 1.x.x](#migrating-from-v0xx-to-1xx)
  * [Contributing](#contributing)
  * [Release History](#release-history)
  * [Related](#related)
  * [License](#license)

## What is npm-package-json-lint?

npm-package-json-lint helps enforce standards for your package.json file.
This helps to ensure that your files are of the highest standard and quality.
It is also customisable to match your specific project guidline requirements/desires.
It has support for both command line and programmatic usage.
Currently it can check for:

* validity of data types in nodes. Ex: `name` should always be a string.
* whether a string is a lowercase
* whether a version number is a valid
* the presence of a given module
* the presence of a pre-release version of a module
* the presence of an author
* the presence of any bugs
* valid dependencies
* valid licenses
* and much more!

Please see the [website](https://npmpackagejsonlint.org/docs/rules) for a list of rules.

## Install and Use

First thing first, let's make sure you have the necessary pre-requisites.

### System Dependencies

#### Node

* [Node.js](https://nodejs.org/) - v16.0.0+
* [npm](http://npmjs.com) - v8.0.0+

### Use the cli

#### Use cli globally

* `npm install npm-package-json-lint -g`

#### Use cli in project

* `npm install npm-package-json-lint`

#### Using the linter

##### From the command line

* Once npm-package-json-lint is installed either in the project or globally it can be run with the 
  following command, `npx npm-package-json-lint`. This will go through the process of linting/validating
  your code to meet your desired specifications.
  
##### In the program

* The linter can also be used as a module in the program and the output be displayed via a log message.
  Adding the following code to your file can accomplish this.

  ```
  const npmPackageJsonLint = require("npm-package-json-lint");
  const result = npmPackageJsonLint.lintFiles(["package.json"]);
  console.log(result);
  ```
 
## Custom Configuration

  npm-package-json-lint has the ability to be constomly configured to match your desires.
  To configure the linter navigate to the .npmpackagejsonlintrc file in the repository and add
  in or remove your desired rules.

## Local Development
Follow these steps to get your local environement set up to allow you to contribute to the repository

1. In the terminal, navigate to the directory in which you want the repository to be cloned.
2. Run this command from the terminal, `git clone https://github.com/tclindner/npm-package-json-lint.git`
3. After cloning the repository navigate into the project's root directory from the terminal.
4. Run "npm install" to install the necessary dependencies.
5. Your local environment is now set up to create PR's and work on different issues

## Documentation

[Website](https://npmpackagejsonlint.org)

Quick links

[CLI commands and configuration](https://npmpackagejsonlint.org/docs/cli) | [Node.js API](https://npmpackagejsonlint.org/docs/api) | [Integrations](https://npmpackagejsonlint.org/docs/integrations)

## Migrating from v6.x.x to 7.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v6-to-v7).

## Migrating from v5.x.x to 6.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v5-to-v6).

## Migrating from v4.x.x to 5.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v4-to-v5).

## Migrating from v3.x.x to 4.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v3-to-v4).

## Migrating from v2.x.x to 3.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v2-to-v3).

## Migrating from v1.x.x to 2.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v1-to-v2).

## Migrating from v0.x.x to 1.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/v0-to-v1).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## Related

* [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default): Shared default configuration module for npm-package-json-lint

## License

Copyright (c) 2016-2023 Thomas Lindner. Licensed under the MIT license.
