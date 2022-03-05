---
id: index
title: What is npm-package-json-lint?
---

npm-package-json-lint is a configurable linter that helps enforce standards for your package.json file. By default no rules are enabled. If you would like to use npm-package-json-lint's default ruleset, please see [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default).

Each rule contains the following properties:

  1. ID - example: require-author
  2. Node - example: author
  3. Message - example: author is required
  4. Rule Type - example: required

As of v2.7.0, there are multiple ways to provide a [configuration object](configuration.md).

  1. Adding a `--configFile` to the command to specify a JSON file. This file is named [`.npmpackagejsonlintrc.json`](rcfile-example.md).
  2. Add a `npmpackagejsonlint` property in `package.json` file
  3. Add a `npmpackagejsonlint.config.js` file that exports a config object in the current working directory.
  4. Add a global `.npmpackagejsonlintrc.json` file in the root of your user directory
  5. Add a global `npmpackagejsonlint.config.js` file that exports a config object in the root of your user directory

### Configuring rules

npm-package-json-lint rules can either be run as an `error`, `warning`, or `off`.

* "warning" - run the rule as a warning
* "error" - run the rule as an error
* "off" - disables the rule

Ex: `"require-author": "error"`

For more details, please see [rules](rules.md).
