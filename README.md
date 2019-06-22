# npm-package-json-lint

> A package.json linter for Node projects


[![license](https://img.shields.io/github/license/tclindner/npm-package-json-lint.svg?maxAge=2592000&style=flat-square)](https://github.com/tclindner/npm-package-json-lint/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/npm-package-json-lint)
[![CircleCI](https://circleci.com/gh/tclindner/npm-package-json-lint.svg?style=svg)](https://circleci.com/gh/tclindner/npm-package-json-lint)
[![Dependency Status](https://david-dm.org/tclindner/npm-package-json-lint.svg?style=flat-square)](https://david-dm.org/tclindner/npm-package-json-lint)
[![devDependency Status](https://david-dm.org/tclindner/npm-package-json-lint/dev-status.svg?style=flat-square)](https://david-dm.org/tclindner/npm-package-json-lint#info=devDependencies)


## What is npm-package-json-lint?

npm-package-json-lint helps enforce standards for your package.json file.
Currently it can check for:

* validity of data types in nodes. Ex: `name` should always be a string.
* whether a string is a lowercase
* whether a version number is a valid
* the presence of a given module
* the presence of a pre-release version of a module
* and much more!

Please see the [wiki](https://github.com/tclindner/npm-package-json-lint/wiki) for a list of rules.

## How do I install it?

First thing first, let's make sure you have the necessary pre-requisites.

### System Dependencies

#### Node

* [Node.js](https://nodejs.org/) - v8.0.0+
* [npm](http://npmjs.com) - v6.0.0+

### Use the cli

#### Use cli globally

* `npm install npm-package-json-lint -g`

#### Use cli in project

* `npm install npm-package-json-lint`

## CLI commands and configuration

| Command | Alias | Description |
|---|---|---|
| npmPkgJsonLint --help | N/A | Lists supported CLI options |
| npmPkgJsonLint --version | N/A | Lists the current version number |
| npmPkgJsonLint --configFile <file path> | -c | File path to local config file or module name. |
| npmPkgJsonLint --quiet | -q | Report errors only |
| npmPkgJsonLint --noConfigFiles | -ncf | Skips loading project config files (i.e. .npmpackagejsonlintrc.json and npmpackagejsonlint.config.js) |
| npmPkgJsonLint --ignorePath | -i | Path to a file containing patterns that describe files to ignore. |

### Examples

```bash
$ npmPkgJsonLint .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint ./package1 ./package2
```

> Looks for all `package.json` files in the `package1` and `package2` directories. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. The CLI also merges the config found in `./config/.npmpackagejsonlintrc.json`

```bash
$ npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
```

> Same as above using the long form for specifying config files.

```bash
$ npmPkgJsonLint -q .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output.

```bash
$ npmPkgJsonLint --quiet ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output using the long form for quieting output.

```bash
$ npmPkgJsonLint . --ignorePath .gitignore
```

> Looks for all `package.json` files in the project and exclude ignored paths. The CLI engine automatically looks for relevant config files for each package.json file that is found.

## Node.js API

npm-package-json-lint exports two main objects: `CLIEngine` and `NpmPackageJsonLint`.

### NpmPackageJsonLint()

Creates an instance of NpmPackageJsonLint

`NpmPackageJsonLint` has one public method, `lint`. `lint` takes a package.json object in object form and a config object as parameters.

#### .lint(packageJsonData, configObj)

Runs configured rules against the provided package.json object.

##### packageJsonData

Type: `object`

A package.json file in object form.

##### configObj

Type: `object`

A valid configuration object.

##### Example

The following example demostrates how to use `lint`.

```js
const NpmPackageJsonLint = require('npm-package-json-lint').NpmPackageJsonLint;

const npmPackageJsonLint = new NpmPackageJsonLint();
const results = npmPackageJsonLint.lint(packageJsonDataAsObject, configObject);
```

##### Return

`lint` returns an object with an array of `LintIssue`s. Please see `LintIssue` section for more detail.

```js
{
  issues: [
    {
      lintId: 'require-name',
      severity: 'error',
      node: 'name',
      lintMessage: 'name is required'
    }
  ]
}
```

#### .version

Calling `.version` on an instance of `NpmPackageJsonLint` will return the version number of npm-package-json-lint that the linter is associated with.

##### Example

```js
const NpmPackageJsonLint = require('npm-package-json-lint').NpmPackageJsonLint;

const npmPackageJsonLint = new NpmPackageJsonLint();

npmPackageJsonLint.version; // => '3.0.0'
```

### CLIEngine(options)

Creates an instance of CLIEngine

##### options

Type: `object`

CLIEngine configuration object

* `configFile`      {string}  Name of module/file to use.
* `cwd`             {string}  The current working diretory for all file operations.
* `useConfigFiles`  {boolean} False disables use of .npmpackagejsonlintrc.json files and npmpackagejsonlint.config.js files.
* `ignorePath`      {string} Path to a file containing patterns that describe files to ignore. The path can be absolute or relative to process.cwd(). By default, npm-package-json-lint looks for .npmpackagejsonlintignore in process.cwd().
* `rules`           {object} An object of rules to use.

##### Example

The following example demostrates how to initialize a `CLIEngine`.

```js
const CLIEngine = require('npm-package-json-lint').CLIEngine;

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  ignorePath: '',
  rules: {}
};

const cliEngine = new CLIEngine(cliEngineOptions);
```

#### .executeOnPackageJsonFiles(patterns)

Runs npm-package-json-lint against the array a patterns.

##### patterns

Type: `array`

An array of glob patterns

##### Example

The following example demostrates how to use `executeOnPackageJsonFiles`.

```js
const CLIEngine = require('npm-package-json-lint').CLIEngine;

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  ignorePath: '',
  rules: {}
};
const patterns = ['.'];

const cliEngine = new CLIEngine(cliEngineOptions);
const results = cliEngine.executeOnPackageJsonFiles(patterns);
```

##### Return

`executeOnPackageJsonFiles` returns an object with an array of results.

```js
{
  results: [
    {
      filePath: './package.json',
      issues: [
        {
          lintId: 'require-name',
          severity: 'error',
          node: 'name',
          lintMessage: 'name is required'
        }
      ],
      errorCount: 1,
      warningCount: 0
    }
  ],
  errorCount: 1,
  warningCount: 0
}
```

#### .version

Calling `.version` on an instance of `CLIEngine` will return the version number of npm-package-json-lint that the CLIEngine is associated with.

##### Example

```js
const CLIEngine = require('npm-package-json-lint').CLIEngine;

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  ignorePath: '',
  rules: {}
};

const cliEngine = new CLIEngine(cliEngineOptions);

cliEngine.version; // => '3.0.0'
```

> **WARNING**

Only the functions documented above are supported. All other functions that are exposed may change with any release. Please refrain from using them.

## Lint Rules

npm-package-json-lint has a configurable set of rules. Please see the [wiki](https://github.com/tclindner/npm-package-json-lint/wiki) for a full list of available rules. By default no rules are enabled. If you would like to use npm-package-json-lint's default ruleset, please see [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default).

Each rule contains the following properties:

  1. ID - example: require-author
  2. Node - example: author
  3. Message - example: author is required
  4. Rule Type - example: required

As of v2.7.0, there are multiple ways to provide a [configuration object](https://github.com/tclindner/npm-package-json-lint/wiki/configuration).

  1. Adding a `--configFile` to the command to specify a JSON file. This file is named [`.npmpackagejsonlintrc.json`](https://github.com/tclindner/npm-package-json-lint/wiki/npm-package-json-lint-rc).
  2. Add a `npmPackageJsonLintConfig` property in `package.json` file
  3. Add a `npmpackagejsonlint.config.js` file that exports a config object in the current working directory.
  4. Add a global `.npmpackagejsonlintrc.json` file in the root of your user directory
  5. Add a global `npmpackagejsonlint.config.js` file that exports a config object in the root of your user directory

### Configuring rules

npm-package-json-lint rules can either be run as an `error`, `warning`, or `off`.

* "warning" - run the rule as a warning
* "error" - run the rule as an error
* "off" - disables the rule

Ex: `"require-author": "error"`

## Migrating from v2.x.x to 3.x.x

Please see the [migration guide](https://github.com/tclindner/npm-package-json-lint/wiki/migrating-from-v2-to-v3).

## Migrating from v1.x.x to 2.x.x

Please see the [migration guide](https://github.com/tclindner/npm-package-json-lint/wiki/migrating-from-v1-to-v2).

## Migrating from v0.x.x to 1.x.x

Please see the [migration guide](https://github.com/tclindner/npm-package-json-lint/wiki/migrating-from-v0-to-v1).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## Related

* [grunt-npm-package-json-lint](https://github.com/tclindner/grunt-npm-package-json-lint): Grunt Wrapper for npm-package-json-lint
* [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default): Shared default configuration module for npm-package-json-lint

## License

Copyright (c) 2016-2019 Thomas Lindner. Licensed under the MIT license.
