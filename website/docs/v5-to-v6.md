---
id: v5-to-v6
title: v5 to v6 Migration Guide
---

v6.0.0 Migration Guide

> FYI: v6 drops support for Node 10 and 12. If you need support for versions of Node that have reached EOL, please use v5.

## Rule definition change

[`name-format`](https://npmpackagejsonlint.org/docs/rules/format/name-format) was updated the use `validate-npm-package-name`. See [#537](https://github.com/tclindner/npm-package-json-lint/pull/537) for more details.

## TypeScript Support

v6 is completely written in TypeScript. The Node.js API is fully typed for easier development.

## Documentation site (website)

The website has been upgraded to Docusaurus v2 (beta). Versioning support has been removed in this release. All docs can now be found in `/website/docs`.

## Additional changes

Please see the [release notes](https://github.com/tclindner/npm-package-json-lint/releases/tag/v6.0.0) for additional changes introduced in v6.0.0.
