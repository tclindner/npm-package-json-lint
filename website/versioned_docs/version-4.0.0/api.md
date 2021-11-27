---
id: version-4.0.0-api
title: Node.js API
original_id: api
---

npm-package-json-lint exports one object, `NpmPackageJsonLint`.

## NpmPackageJsonLint(options)

Creates an instance of NpmPackageJsonLint

`NpmPackageJsonLint` has one public method, `lint`. `lint` takes a `NpmPackageJsonLintOptions` object.

### options

Type: `Object`

A `NpmPackageJsonLint` options object.

| Option | Type | Description | Default |
| --- | --- | --- | --- |
| `cwd` | {string} | The current working diretory for all file operations. | `process.cwd()` |
| `packageJsonObject` | {Object} | A package.json object. This must be provided or a `patterns` should be provided. | -- |
| `packageJsonFilePath` | {string} | If providing a package.json object, this option allows a file path to be assigned to it. | -- |
| `config` | {object} | Allows for a config object to be passed as an object via code instead of a file. | -- |
| `configFile` | {string} | Relative path to a configuration file. If provided, the config in the file will be used and npm-package-json-lint will not traverse the file system to find other config files. | -- |
| `patterns` | {string[]} | An array of glob patterns used to find package.json files. This must be provided or a `packageJsonObject` should be provided. | -- |
| `quiet` | {boolean} | A flag indicating whether to suppress warnings. | `false` |
| `ignorePath` | {string} | File path to an ignore file. | `` |

#### Example

The following example demostrates how to instantiate `NpmPackageJsonLint`.

```js
const {NpmPackageJsonLint} = require('npm-package-json-lint');

const npmPackageJsonLint = new NpmPackageJsonLint({
  cwd,
  packageJsonObject,
  packageJsonFilePath,
  config,
  configFile,
  configBaseDirectory,
  patterns,
  quiet,
  ignorePath
});
```

### .lint()

Runs configured rules against the provided package.json object(s).

#### Example

The following example demostrates how to use `lint`.

```js
const {NpmPackageJsonLint} = require('npm-package-json-lint');

const npmPackageJsonLint = new NpmPackageJsonLint({
  ...
});
const results = npmPackageJsonLint.lint();
```

#### Return

Returns an object with an array of results.

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
      ignoreCount: 0,
      warningCount: 0
    }
  ],
  errorCount: 1,
  ignoreCount: 0,
  warningCount: 0
}
```

> **WARNING**

Only the functions documented above are supported. All other functions that are exposed may change with any release. Please refrain from using them.
