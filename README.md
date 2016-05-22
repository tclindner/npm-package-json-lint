# npm-package-json-lint

> A package.json linter for Node projects


[![license](https://img.shields.io/github/license/tclindner/npm-package-json-lint.svg?maxAge=2592000&style=flat-square)](https://github.com/tclindner/npm-package-json-lint/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/npm-package-json-lint)
[![Travis](https://img.shields.io/travis/tclindner/npm-package-json-lint.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/tclindner/npm-package-json-lint)
[![Dependency Status](https://david-dm.org/tclindner/npm-package-json-lint.svg?style=flat-square)](https://david-dm.org/tclindner/npm-package-json-lint)
[![devDependency Status](https://david-dm.org/tclindner/npm-package-json-lint/dev-status.svg?style=flat-square)](https://david-dm.org/tclindner/npm-package-json-lint#info=devDependencies)


## What is package json lint?

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

* [Node.js](https://nodejs.org/) - v4.2.0+
* [npm](http://npmjs.com) - v2.14.7+

### Use the cli

* `npm install npm-package-json-lint -g`

## Commands and configuration

| Command | Alias | Description |
|---|---|---|
| pjl-cli --help | -h | Lists supported CLI options |
| pjl-cli --version | -v | Lists the current version number |
| pjl-cli --file <file path> | -f | File path including name. Defaults to package.json |
| pjl-cli --rule <rule name> | -r | Valid rule name to check. Defaults to nothing |
| pjl-cli --rules-file <file path> | -c | File path of .npmpackagejsonlintrc |
| pjl-cli --ignore-warnings | -w | Ignore warnings |

### Examples

Run a specific rule, author-valid-values, on a file relative to the current working directory.
`pjl-cli -f "../relative-path/package.json" -r "require-author: 'error'"`

Run a specific rule, author-valid-values, ignoring warnings on a file relative to the current working directory.
`pjl-cli -f "../relative-path/package.json" -r "require-author: 'error'" --ignore-warnings`

Run using the config in `.npmpackagejsonlintrc` on a file relative to the current working directory.
`pjl-cli -f "../relative-path/package.json" -c "./.npmpackagejsonlintrc"`

Run using the default config on a file relative to the current working directory
`pjl-cli -f "../relative-path/package.json"`

## Lint Rules

npm-package-json-lint has a configurable set of rules. Please see the [wiki](https://github.com/tclindner/npm-package-json-lint/wiki) for a full list of available rules. By [default](src/defaultConfig.js) only type checks and name/version rules are enforced. This is the bare minimum configuration.

Each rule contains the following properties:

  1. ID - example: require-author
  2. Node - example: author
  3. Message - example: author is required
  4. Rule Type - example: required

As mentioned in the "Commands and configuration" section there are two ways to specify rule sets. The first is using `--rule` to specify a given rule. This will run npm-package-json-lint with just this rule. The second is using `--rules-file` to specify a JSON file, named [`.npmpackagejsonlintrc`](https://github.com/tclindner/npm-package-json-lint/wiki/npm-package-json-lint-rc), to run a set of rules. If neither of the options above are specified then npm-package-json-lint looks for a global [`.npmpackagejsonlintrc`](https://github.com/tclindner/npm-package-json-lint/wiki/npm-package-json-lint-rc) file in the root of your user directory. Finally, if a global [`.npmpackagejsonlintrc`](https://github.com/tclindner/npm-package-json-lint/wiki/npm-package-json-lint-rc) file doesn't exist then the [defaults](src/defaultConfig.js) are used.

### Configuring rules

npm-package-json-lint rules can either be run as an `error` or a `warning`.

* "warning" - run the rule as a warning
* "error" - run the rule as an error

Ex: `"require-author": "error"`

## Migrating from v0.x.x to 1.x.x

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Release History

Please see [CHANGELOG.md](CHANGELOG.md).

## Related

* [grunt-npm-package-json-lint](grunt-npm-package-json-lint): Grunt Wrapper for npm-package-json-lint

## License

Copyright (c) 2016 Thomas Lindner. Licensed under the MIT license.
