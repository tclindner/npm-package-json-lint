---
id: version-3.7.0-api
title: Node.js API
original_id: api
---

npm-package-json-lint exports two main objects: `CLIEngine` and `NpmPackageJsonLint`.

## NpmPackageJsonLint()

Creates an instance of NpmPackageJsonLint

`NpmPackageJsonLint` has one public method, `lint`. `lint` takes a package.json object in object form and a config object as parameters.

### .lint(packageJsonData, configObj)

Runs configured rules against the provided package.json object.

#### packageJsonData

Type: `Object`

A package.json file in object form.

#### configObj

Type: `Object`

A valid configuration object.

#### Example

The following example demostrates how to use `lint`.

```js
const {NpmPackageJsonLint} = require('npm-package-json-lint');

const npmPackageJsonLint = new NpmPackageJsonLint();
const results = npmPackageJsonLint.lint(packageJsonDataAsObject, configObject);
```

#### Return

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

### .version

Calling `.version` on an instance of `NpmPackageJsonLint` will return the version number of npm-package-json-lint that the linter is associated with.

#### Example

```js
const {NpmPackageJsonLint} = require('npm-package-json-lint');

const npmPackageJsonLint = new NpmPackageJsonLint();

npmPackageJsonLint.version;
// => '3.0.0'
```

## CLIEngine(options)

Creates an instance of CLIEngine

### options

Type: `Object`

CLIEngine configuration object

* `configFile`      {String}  Name of module/file to use.
* `cwd`             {String}  The current working diretory for all file operations.
* `useConfigFiles`  {Boolean} False disables use of .npmpackagejsonlintrc.json files and npmpackagejsonlint.config.js files.
* `rules`            {Object} An object of rules to use.

### Example

The following example demostrates how to initialize a `CLIEngine`.

```js
const {CLIEngine} = require('npm-package-json-lint');

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  rules: {}
};

const cliEngine = new CLIEngine(cliEngineOptions);
```

### .executeOnPackageJsonFiles(patterns)

Runs npm-package-json-lint against the array a patterns.

#### patterns

Type: `Array`

An array of glob patterns

#### Example

The following example demostrates how to use `executeOnPackageJsonFiles`.

```js
const {CLIEngine} = require('npm-package-json-lint');

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  rules: {}
};
const patterns = ['.'];

const cliEngine = new CLIEngine(cliEngineOptions);
const results = cliEngine.executeOnPackageJsonFiles(patterns);
```

#### Return

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

### .version

Calling `.version` on an instance of `CLIEngine` will return the version number of npm-package-json-lint that the CLIEngine is associated with.

#### Example

```js
const {CLIEngine} = require('npm-package-json-lint');

const cliEngineOptions = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  rules: {}
};

const cliEngine = new CLIEngine(cliEngineOptions);

cliEngine.version;
// => '3.0.0'
```

> **WARNING**

Only the functions documented above are supported. All other functions that are exposed may change with any release. Please refrain from using them.
