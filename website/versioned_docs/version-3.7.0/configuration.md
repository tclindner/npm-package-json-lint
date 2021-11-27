---
id: version-3.7.0-configuration
title: Configuration
original_id: configuration
---

As mentioned in the [README.md](https://github.com/tclindner/npm-package-json-lint/blob/master/README.md) there are two ways to specify rule sets. The first is using `--rule` to specify a given rule. This will run npm-package-json-lint with just this rule. The second is providing a configuration object. As of v2.7.0, there are multiple ways to provide a configuration object. They include:

  1. Adding `--rules-file` to the command to specify a JSON file. This file is typically named [`.npmpackagejsonlintrc.json`](rcfile-example.md); however, you may optionally add a `.json` extension if you prefer.
  2. Add a `npmPackageJsonLintConfig` property in `package.json` file
  4. Add a `npmpackagejsonlint.config.js` file that exports a config object in the current working directory.
  5. Add a global `.npmpackagejsonlintrc.json` file in the root of your user directory
  6. Add a global `npmpackagejsonlint.config.js` file that exports a config object in the root of your user directory

## Examples

> Note: this is valid for v2.x.x+. Please see [migrating-from-v1-to-v2](v1-to-v2.md). Please see [`.npmpackagejsonlintrc.json`](rcfile-example.md) if you would like a v1 example.

### .npmpackagejsonlintrc / .npmpackagejsonlintrc.json

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

### npmPackageJsonLintConfig package.json property

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
  "npmPackageJsonLintConfig": {
    "rules": {
      "require-author": "error"
    }
  }
}

```

### npmpackagejsonlint.config.js

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
