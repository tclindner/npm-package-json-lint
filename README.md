# npm-package-json-lint

> A package.json linter for Node projects


[![license](https://img.shields.io/github/license/tclindner/npm-package-json-lint.svg?maxAge=2592000&style=flat-square)](https://github.com/tclindner/npm-package-json-lint/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/npm-package-json-lint)
![ci](https://github.com/tclindner/npm-package-json-lint/workflows/ci/badge.svg?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e76a30d9-13f0-4691-a49b-454570589de2/deploy-status)](https://app.netlify.com/sites/npmpackagejsonlint/deploys)


## What is npm-package-json-lint?

npm-package-json-lint helps enforce standards for your package.json file.
Currently it can check for:

* validity of data types in nodes. Ex: `name` should always be a string.
* whether a string is a lowercase
* whether a version number is a valid
* the presence of a given module
* the presence of a pre-release version of a module
* and much more!

Please see the [website](https://npmpackagejsonlint.org/docs/en/rules) for a list of rules.

## How do I install it?

First thing first, let's make sure you have the necessary pre-requisites.

### System Dependencies

#### Node

* [Node.js](https://nodejs.org/) - v10.0.0+
* [npm](http://npmjs.com) - v6.0.0+

### Use the cli

#### Use cli globally

* `npm install npm-package-json-lint -g`

#### Use cli in project

* `npm install npm-package-json-lint`

## Documentation

[Website](https://npmpackagejsonlint.org)

Quick links

[CLI commands and configuration](https://npmpackagejsonlint.org/docs/en/cli) | [Node.js API](https://npmpackagejsonlint.org/docs/en/api)

## Migrating from v4.x.x to 5.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/en/v4-to-v5).

## Migrating from v3.x.x to 4.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/en/v3-to-v4).

## Migrating from v2.x.x to 3.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/en/v2-to-v3).

## Migrating from v1.x.x to 2.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/en/v1-to-v2).

## Migrating from v0.x.x to 1.x.x

Please see the [migration guide](https://npmpackagejsonlint.org/docs/en/v0-to-v1).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## Related

* [grunt-npm-package-json-lint](https://github.com/tclindner/grunt-npm-package-json-lint): Grunt Wrapper for npm-package-json-lint
* [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default): Shared default configuration module for npm-package-json-lint

## License

Copyright (c) 2016-2022 Thomas Lindner. Licensed under the MIT license.
