---
id: version-3.7.0-v2-to-v3
title: v2 to v3 Migration Guide
original_id: v2-to-v3
---

v3.0.0 Migration Guide

> FYI: v3 drops support for Node 4 and 5. If you need support for versions of Node that have reached EOL, please use v2.

npm-package-json-lint's cli has been renamed from `pjl-cli` to `npmPkgJsonLint`. The cli interface has also changed. Multiple patterns can now specified. Please use the following examples to help get started.

```bash
$ npmPkgJsonLint .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint ./package1 ./package2
```

> Looks for all `package.json` files in the `package1` and `package2` directories. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
$ npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. The CLI also merges the config found in `./config/.npmpackagejsonlintrc.json`

```bash
$ npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
```

> Same as above using the long form for specifying config files.

```bash
$ npmPkgJsonLint -q .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output.

```bash
$ npmPkgJsonLint --quiet ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output using the long form for quieting output.

## Node.js API

There is a new [Node.js API](api.md) available. Please see the docs.

Please see the [release notes](https://github.com/tclindner/npm-package-json-lint/releases/tag/v3.0.0) for additional changes introduced in v3.0.0.
