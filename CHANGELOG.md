# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

### Fixed

### Removed

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
