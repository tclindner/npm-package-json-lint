# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

### Fixed

### Removed

## [3.0.0-alpha1] - 2018-04-29
### Added
- Added support for glob based package.json file detection. Addresses [#74](https://github.com/tclindner/npm-package-json-lint/issues/74).
- Added support for recursive config file detection. Addresses [#75](https://github.com/tclindner/npm-package-json-lint/issues/75).
- Added support for running npm-package-json-lint programmatically. Addresses [#76](https://github.com/tclindner/npm-package-json-lint/issues/76).

### Removed
- Dropped support for Node 4 and 5.

## [2.11.2] - 2018-02-18
### Fixed
- Addressed issue, from @akihyro, [#71](https://github.com/tclindner/npm-package-json-lint/issues/71). Bundled dependencies should be arrays instead of objects. Impacts [bundledDependencies-type](https://github.com/tclindner/npm-package-json-lint/wiki/bundledDependencies-type)

## [2.11.1] - 2017-12-27
### Fixed
- Addressed issue, from @hassankhan, [#64](https://github.com/tclindner/npm-package-json-lint/issues/64). This change adds support for authors as objects. Impacts [valid-values-author](https://github.com/tclindner/npm-package-json-lint/wiki/valid-values-author)

## [2.11.0] - 2017-09-02
### Added
- New rule: [require-module](https://github.com/tclindner/npm-package-json-lint/wiki/require-module)

## [2.10.0] - 2017-09-02
### Changed
- Addressed issues, from @moshest, [#57](https://github.com/tclindner/npm-package-json-lint/issues/57) and [#58](https://github.com/tclindner/npm-package-json-lint/issues/58). This change gives better recommendations for what change is required by the user to resolve the lint issue. It also no longer throws an error when a property exists in the package.json file that doesn't exist in the preferred property order array. Thanks @moshest.

## [2.9.0] - 2017-08-29
### Changed
- Update all rules to export the type of rule they are. Current valid values are "standard" and "array". The rules loader has been updated to references the ruleType export rather than trying to maintain a separate list of array style rules. This change closes [issue #56](https://github.com/tclindner/npm-package-json-lint/issues/56) and should prevent the issue discussed in [issue #53](https://github.com/tclindner/npm-package-json-lint/issues/53) from occurring again.

## [2.8.2] - 2017-08-23
### Fixed
- Rule loader so it recognized [prefer-property-order](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-property-order) as an array type rule.

## [2.8.1] - 2017-08-21
### Changed/Fixed
- Updated rule: [prefer-property-order](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-property-order) based on discussion with @moshest in [issue #50](https://github.com/tclindner/npm-package-json-lint/issues/50) and @evilebottnawi in [issue #53](https://github.com/tclindner/npm-package-json-lint/issues/53).

## [2.8.0] - 2017-08-16
### Added
- New rule: [prefer-property-order](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-property-order)

## [2.7.1] - 2017-08-15
### Fixed
- [Issue #48](https://github.com/tclindner/npm-package-json-lint/issues/48) [valid-values-license](https://github.com/tclindner/npm-package-json-lint/wiki/valid-values-license)

## [2.7.0] - 2017-08-08
### Added
- The ability to pass config using:
  1. a `npmPackageJsonLintConfig` property in `package.json`
  2. a `.npmpackagejsonlintrc` file in the current working directory
  3. a `npmpackagejsonlint.config.js` file that exports a config object in the current working directory.
  4. a global `.npmpackagejsonlintrc` file in the root of your user directory
  5. a global `npmpackagejsonlint.config.js` file that exports a config object in the root of your user directory

## [2.6.0] - 2017-07-30
### Changed
- Bumped dependencies
- Converted grunt tasks to npm scripts
- Update cli output format for cleaner output

## [2.5.0] - 2017-06-11
### Changed
@chr1shaefn3r enhanced the following rules so they no longer require a leading equals sign

- [prefer-absolute-version-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-absolute-version-dependencies)
- [prefer-absolute-version-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-absolute-version-devDependencies)

## [2.4.0] - 2017-05-24
### Added
Thanks to @chr1shaefn3r for submitting the new rules

- New rule: [prefer-absolute-version-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-absolute-version-dependencies)
- New rule: [prefer-absolute-version-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-absolute-version-devDependencies)

### Changed
- Improved the message when prefer-alphabetical-dependencies, prefer-alphabetical-devDependencies, prefer-alphabetical-bundledDependencies, prefer-alphabetical-optionalDependencies, or prefer-alphabetical-peerDependencies are triggered. Now failing dependency is communicated as well as the dependency it must be placed after.

## [2.3.0] - 2017-04-22
### Added
- New rule: [prefer-alphabetical-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-alphabetical-dependencies)
- New rule: [prefer-alphabetical-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-alphabetical-devDependencies)
- New rule: [prefer-alphabetical-bundledDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-alphabetical-bundledDependencies)
- New rule: [prefer-alphabetical-optionalDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-alphabetical-optionalDependencies)
- New rule: [prefer-alphabetical-peerDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-alphabetical-peerDependencies)

### Removed
- grunt tasks, tests, and project linting files from published node module

## [2.2.0] - 2017-04-12
### Added
- Add new quiet (-q) option to cli that suppresses output if no errors

## [2.1.2] - 2017-04-10
### Fixed
- Array style rules, like `valid-values-author`, so they can be easily turned off by setting `valid-values-author: 'off'`

## [2.1.1] - 2017-04-10
### Fixed
- CLI so process exit code remains 0 if only warnings are detected

## [2.1.0] - 2017-04-09
### Changed
- CLI process exit code to 2 (non-zero) if issues are detected in the scan

## [2.0.2] - 2017-02-18
### Fixed
- Issue .npmpackagejsonlintrc.json files that only have a extends value with no rules object

## [2.0.1] - 2017-02-18
### Fixed
- Issue with relative path local config extension modules. Now relative path modules are load relative to the current working directory of the active process.

## [2.0.0] - 2017-02-18
### Added
- Support configuration extension!! Now you can add "extends" to your rc file to extend a based configuration. This is great for sharing a standard ruleset between many projects.  Please see the [wiki](https://github.com/tclindner/npm-package-json-lint/wiki) for more information.
- An optional cli flag for controlling rule severity. Please see the [README.md](README.md) for examples.

### Removed
- Default configuration is no longer provided. Please see the new default config module, [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default)

## [1.4.0] - 2016-10-15
### Added
- New rule: [valid-values-license](https://github.com/tclindner/npm-package-json-lint/wiki/valid-values-license)

## [1.3.0] - 2016-07-26
### Added
- New rule: [prefer-no-engineStrict](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-no-engineStrict)

## [1.2.0] - 2016-07-26
### Changed
- Bump grunt-eslint to version 19.0.0
- Move to shared eslint-config-tc module

## [1.1.0] - 2016-07-17
### Added
- Error handling if an invalid rule name is included in `.npmpackagejsonlintrc.json`.

### Fixed
- Issue resolving file path of `.npmpackagejsonlintrc.json` when running the cli from a nested directory under `node_modules`

## [1.0.0] - 2016-05-22
### Added
- New rule: [require-bin](https://github.com/tclindner/npm-package-json-lint/wiki/require-bin)
- New rule: [require-bugs](https://github.com/tclindner/npm-package-json-lint/wiki/require-bugs)
- New rule: [require-bundledDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/require-bundledDependencies)
- New rule: [require-config](https://github.com/tclindner/npm-package-json-lint/wiki/require-config)
- New rule: [require-contributors](https://github.com/tclindner/npm-package-json-lint/wiki/require-contributors)
- New rule: [require-cpu](https://github.com/tclindner/npm-package-json-lint/wiki/require-cpu)
- New rule: [require-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/require-dependencies)
- New rule: [require-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/require-devDependencies)
- New rule: [require-directories](https://github.com/tclindner/npm-package-json-lint/wiki/require-directories)
- New rule: [require-files](https://github.com/tclindner/npm-package-json-lint/wiki/require-files)
- New rule: [require-homepage](https://github.com/tclindner/npm-package-json-lint/wiki/require-homepage)
- New rule: [require-main](https://github.com/tclindner/npm-package-json-lint/wiki/require-main)
- New rule: [require-man](https://github.com/tclindner/npm-package-json-lint/wiki/require-man)
- New rule: [require-optionalDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/require-optionalDependencies)
- New rule: [require-os](https://github.com/tclindner/npm-package-json-lint/wiki/require-os)
- New rule: [require-peerDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/require-peerDependencies)
- New rule: [require-preferGlobal](https://github.com/tclindner/npm-package-json-lint/wiki/require-preferGlobal)
- New rule: [require-private](https://github.com/tclindner/npm-package-json-lint/wiki/require-private)
- New rule: [require-publishConfig](https://github.com/tclindner/npm-package-json-lint/wiki/require-publishConfig)
- New rule: [require-repository](https://github.com/tclindner/npm-package-json-lint/wiki/require-repository)
- New rule: [require-scripts](https://github.com/tclindner/npm-package-json-lint/wiki/require-scripts)
- New rule: [os-type](https://github.com/tclindner/npm-package-json-lint/wiki/os-type)
- New rule: [cpu-type](https://github.com/tclindner/npm-package-json-lint/wiki/cpu-type)
- New rule: [optionalDependencies-type](https://github.com/tclindner/npm-package-json-lint/wiki/optionalDependencies-type)
- New rule: [peerDependencies-type](https://github.com/tclindner/npm-package-json-lint/wiki/peerDependencies-type)
- New rule: [bundledDependencies-type](https://github.com/tclindner/npm-package-json-lint/wiki/bundledDependencies-type)
- Ability to specify whether a rule should be an error or a warning
- Defaults now only include "type" rules and rules for name/version

### Changed
- Renamed `author-required` to `require-author`
- Renamed `description-required` to `require-description`
- Renamed `engines-required` to `require-engines`
- Renamed `license-required` to `require-license`
- Renamed `name-required` to `require-name`
- Renamed `repository-required` to `require-repository`
- Renamed `version-required` to `require-version`
- Renamed `bugs-recommended` to `require-bugs`
- Renamed `homepage-recommended` to `require-homepage`
- Renamed `keywords-recommended` to `require-keywords`
- Renamed `author-valid-values` to `valid-values-author`
- Renamed `private-valid-values` to `valid-values-private`
- Renamed `dependencies-invalid-dependencies` to `no-restricted-dependencies`
- Renamed `dependencies-invalid-pre-release-dependencies` to `no-restricted-pre-release-dependencies`
- Renamed `devDependencies-invalid-dependencies` to `no-restricted-devDependencies`
- Renamed `devDependencies-invalid-pre-release-dependencies` to `no-restricted-pre-release-devDependencies`

### Fixed
- Updated `man-type` to account for both settings, array and string

## [0.4.0] - 2016-05-13
### Added
- New rule: [prefer-caret-version-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-caret-version-dependencies)
- New rule: [prefer-tilde-version-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-tilde-version-dependencies)
- New rule: [prefer-caret-version-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-caret-version-devDependencies)
- New rule: [prefer-tilde-version-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-tilde-version-devDependencies)
- New rule: [prefer-no-version-zero-dependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-no-version-zero-dependencies)
- New rule: [prefer-no-version-zero-devDependencies](https://github.com/tclindner/npm-package-json-lint/wiki/prefer-no-version-zero-devDependencies)

### Changed
- Update to single quotes (ESLint rule: quotes)

## [0.3.0] - 2016-05-10
### Changed
- Bumped deps
- Add node 6 tests on TravisCI

## [0.2.0] - 2016-05-01
### Added
- ESLint to build process

### Fixed
- README cli alias flags
- Remove invalid README column from

### Removed
- JSHint from build process

## [0.1.0] - 2016-04-20
### Added
- First release
