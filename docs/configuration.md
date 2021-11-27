---
id: configuration
title: Configuration
---

The following documentation outlines how to work with configuration.

### Configuring rules

npm-package-json-lint rules can either be run as an `error`, `warning`, or `off`.

* "warning" - run the rule as a warning
* "error" - run the rule as an error
* "off" - disables the rule

Ex: `"require-author": "error"`

### .npmpackagejsonlintrc.json file

Please see [.npmpackagejsonlintrc.json](rcfile-example.md) file.

### Shareable config

v2+ added support for shareable npm-package-json-lint config! If you would like to use your .npmpackagejsonlintrc.json file in multiple projects you can create a npm module that exports your config.

#### How to create shared config

Create a new npm module that exports the desired npm-package-json-lint configuration. The module name must start with `npm-package-json-lint-config-`. Add the desired configuration to the index.js file.

```js
const config = {
  'rules': {
    'require-name': 'error'
  }
};

module.exports = config;
```

For a complete example, please see [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default)

#### How to publish a shared config module

Follow these instructions for [publishing to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages).  Please add the following keywords for discoverability, `npm-package-json-lint`, `npm-package-json-lintconfig`, and `npm-package-json-lint-config`.

Please also add a dependency on npm-package-json-lint using [peerdependencies](https://docs.npmjs.com/files/package.json#peerdependencies). Example

```json
"peerDependencies": {
  "npm-package-json-lint": ">= 2"
}
```

#### How to use a shared config module

Add the following to your `.npmpackagejsonlintrc.json` file.

```json
{
  "extends": "npm-package-json-lint-config-default"
}
```

`npm-package-json-lint-config-default` can be replaced by the name of the shared module you are using.

### Configuration override

v4+ added support for configuration overrides. This is great for monorepos. Please see an example below:

```json
{
  "extends": "npm-package-json-lint-config-default",
  "overrides": [
    {
      "patterns": ["modules/module1/**/package.json"],
      "rules": {
        "license-type": "warning"
      }
    },
    {
      "patterns": ["modules/module2/**/package.json"],
      "rules": {
        "valid-values-license": ["error", ["Bob"]]
      }
    }
  ]
}
```

What is this doing?

* `license-type` will be set to `warning` for all package.json files under `modules/module1`.
* `valid-values-license` will be set to `["error", ["Bob"]]` for all package.json files under `modules/module2`.

## Config Sources

There are multiple ways to provide configuration. They include:

  1. Add a `npmpackagejsonlint` property in `package.json` file
  2. Add a `npmpackagejsonlint.config.js` file that exports a config object in the current working directory.
  3. Add a global `.npmpackagejsonlintrc.json` file in the root of your user directory
  4. Add a global `npmpackagejsonlint.config.js` file that exports a config object in the root of your user directory

### Config Examples

> Note: this is valid for v2.x.x+. Please see [migrating-from-v1-to-v2](v1-to-v2.md). Please see [`.npmpackagejsonlintrc.json`](rcfile-example.md) if you would like a v1 example.

#### .npmpackagejsonlintrc / .npmpackagejsonlintrc.json

```json
{
  "rules": {
    "require-author": "error",
    "require-description": "error",
    "require-engines": "error",
    "require-license": "error",
    "require-name": "error",
    "require-repository": "error",
    "require-version": "error",
    "require-bugs": "error",
    "require-homepage": "error",
    "require-keywords": "error",
    "bin-type": "error",
    "config-type": "error",
    "description-type": "error",
    "devDependencies-type": "error",
    "directories-type": "error",
    "engines-type": "error",
    "files-type": "error",
    "homepage-type": "error",
    "keywords-type": "error",
    "license-type": "error",
    "main-type": "error",
    "man-type": "error",
    "name-type": "error",
    "preferGlobal-type": "error",
    "private-type": "error",
    "repository-type": "error",
    "scripts-type": "error",
    "version-type": "error",
    "valid-values-author": ["error", [
      "Thomas Lindner"
    ]],
    "valid-values-private": ["error", [
      false
    ]],
    "no-restricted-dependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-pre-release-dependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-devDependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-pre-release-devDependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "name-format": "error",
    "version-format": "error"
  }
}
```

#### npmpackagejsonlint package.json property

> Note: Only one rule included to keep the example concise

```json
{
  "name": "npm-package-json-lint",
  "version": "0.1.0",
  "description": "CLI app for linting package.json files.",
  "keywords": [
    "lint"
  ],
  "homepage": "https://github.com/tclindner/npm-package-json-lint",
  "author": "Thomas Lindner",
  "repository": {
    "type": "git",
    "url": "https://github.com/tclindner/npm-package-json-lint"
  },
  "devDependencies": {
    "mocha": "^2.4.5"
  },
  "npmpackagejsonlint": {
    "rules": {
      "require-author": "error"
    }
  }
}

```

#### npmpackagejsonlint.config.js

> Note: Only one rule included to keep the example concise

```js
'use strict';

module.exports = {
  rules: {
    'require-author': 'error'
  }
};
```

## Configuration Schema

A JSON schema is available here to validate your configuration. <http://json.schemastore.org/npmpackagejsonlintrc>.
