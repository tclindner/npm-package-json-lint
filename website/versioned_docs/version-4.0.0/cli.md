---
id: version-4.0.0-cli
title: CLI
original_id: cli
---

Run npm-package-json-lint through the CLI with this script.

```bash
npmPkgJsonLint [opts] [fileGlobPatterns ...]
```

npm-package-json-lint ignores files located in `node_modules` directory.

### Examples

```bash
npmPkgJsonLint .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
npmPkgJsonLint ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found.

```bash
npmPkgJsonLint ./package1 ./package2
```

> Looks for all `package.json` files in the `package1` and `package2` directories. The CLI engine automatically looks for relevant config files for each package.json file that is found.

## `--configFile <file path>` (alias `-c`)

File path to local config file or module name. Please see [configuration](configuration.md) for more details.

### Examples

```bash
npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. The CLI also merges the config found in `./config/.npmpackagejsonlintrc.json`

```bash
npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
```

## `--quiet` (alias `-q`)

Report errors only.

### Examples

```bash
npmPkgJsonLint -q .
```

> Looks for all `package.json` files in the project. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output.

```bash
npmPkgJsonLint --quiet ./packages
```

> Looks for all `package.json` files in the `packages` directory. The CLI engine automatically looks for relevant config files for each package.json file that is found. Removes any warnings from the output using the long form for quieting output.

## `--noConfigFiles` (alias `-ncf`)

Skips loading project config files (i.e. .npmpackagejsonlintrc.json and npmpackagejsonlint.config.js).

## `--ignorePath` (alias `-i`)

Path to a file containing patterns that describe files to ignore. By default, npm-package-json-lint looks for `./.npmpackagejsonlintignore`.

### Examples

```bash
npmPkgJsonLint . --ignorePath .gitignore
```

> Looks for all `package.json` files in the project and exclude ignored paths. The CLI engine automatically looks for relevant config files for each package.json file that is found.

## `--maxWarnings` (alias `-mw`)

Max number of warnings that are allowed before an error is thrown. By default, npm-package-json-lint allows `10000000`.
