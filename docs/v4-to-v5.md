---
id: v4-to-v5
title: v4 to v5 Migration Guide
---

v5.0.0 Migration Guide

> FYI: v5 drops support for Node 8 and 9. If you need support for versions of Node that have reached EOL, please use v4.

## Rule definition change

[`prefer-no-devDependencies`](https://npmpackagejsonlint.org/docs/en/rules/dependencies/prefer-no-devDependencies) is been change to a `standard` rule type (#238). You must pass the severity level as a string. `error`, `warning`, or `off`.

## cosmicconfig v6.0.0 upgrade

Bump cosmicconfig from 5.2.1 to 6.0.0 (#239)

*Important*: Read the [cosmicconfig release notes](https://github.com/davidtheclark/cosmiconfig/blob/master/CHANGELOG.md#600)! There are breaking changes to consider.

## Additional changes

Please see the [release notes](https://github.com/tclindner/npm-package-json-lint/releases/tag/v5.0.0) for additional changes introduced in v5.0.0.
