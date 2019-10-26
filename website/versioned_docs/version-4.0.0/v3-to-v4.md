---
id: version-4.0.0-v3-to-v4
title: v3 to v4 Migration Guide
original_id: v3-to-v4
---

v4.0.0 Migration Guide

> FYI: v4 drops support for Node 6 and 7. If you need support for versions of Node that have reached EOL, please use v3.

## Node.js API

There is a new [Node.js API](api.md) available. Please see the docs.

## package.json configuration property name change

It is possible to specify configuration in your package.json file. In v3, the property name was `npmPackageJsonLintConfig`. This must be changed to `npmpackagejsonlint` in v4.

## Additional changes

Please see the [release notes](https://github.com/tclindner/npm-package-json-lint/releases/tag/v4.0.0) for additional changes introduced in v4.0.0.
