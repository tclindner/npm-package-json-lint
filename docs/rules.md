---
id: rules
title: Rules
---

Rules allow npm-package-json-lint to be fully customizable. npm-package-json-lint will only run the rules supplied. As of v2.7.0, there are multiple ways to supply [configuration](configuration.md). One of the easiest way is via a [.npmpackagejsonlintrc.json](rcfile-example.md) file. The default configuration supplied in v1 is no longer provided in v2. Please see the new default config module, [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default) instead.

> Migrating from v3.x.x to 4.x.x?

Please see [migrating-from-v3-to-v4](v3-to-v4.md)

> Migrating from v2.x.x to 3.x.x?

Please see [migrating-from-v2-to-v3](v2-to-v3.md)

> Migrating from v1.x.x to 2.x.x?

Please see [migrating-from-v1-to-v2](v1-to-v2.md)

> Migrating from v0.x.x to 1.x.x?

Please see [migrating-from-v0-to-v1](v0-to-v1.md)

### Configuring rules
npm-package-json-lint rules can either be run as an `error`, `warning`, or `off`.

* "warning" - run the rule as a warning
* "error" - run the rule as an error
* "off" - disables the rule

Ex: `"require-author": "error"`

### .npmpackagejsonlintrc.json file

Please see [.npmpackagejsonlintrc.json](rcfile-example.md) file.

### Shareable config
v2 added support for shareable npm-package-json-lint config! If you would like to use your .npmpackagejsonlintrc.json file in multiple projects you can create a npm module that exports your config.

#### How to create shared config
Create a new npm module that exports the desired npm-package-json-lint configuration. The module name must start with `npm-package-json-lint-config-`. Add the desired configuration to the index.js file.

```
const config = {
  'rules': {
    'require-name': 'error'
  }
};

module.exports = config;
```

For a complete example, please see [npm-package-json-lint-config-default](https://github.com/tclindner/npm-package-json-lint-config-default)

#### How to publish a shared config module
Follow these instructions for [publishing to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages).  Please add the following keywords for discoverability, `npm-package-json-lint`, `npm-package-json-lintconfig`, and `npm-package-json-lint-config`.

Please also add a dependency on npm-package-json-lint using [peerdependencies](https://docs.npmjs.com/files/package.json#peerdependencies). Example

```
peerDependencies: {
  "npm-package-json-lint": ">= 2"
}
```

#### How to use a shared config module
Add the following to your `.npmpackagejsonlintrc.json` file.

```
{
  "extends": "npm-package-json-lint-config-default"
}
```

`npm-package-json-lint-config-default` can be replaced by the name of the shared module you are using.

## Require node rules

> Generates an error if node is missing from package.json file

* [require-author](rules/required-node/require-author.md)
* [require-bin](rules/required-node/require-bin.md)
* [require-bugs](rules/required-node/require-bugs.md)
* [require-bundledDependencies](rules/required-node/require-bundledDependencies.md)
* [require-config](rules/required-node/require-config.md)
* [require-contributors](rules/required-node/require-contributors.md)
* [require-cpu](rules/required-node/require-cpu.md)
* [require-dependencies](rules/required-node/require-dependencies.md)
* [require-description](rules/required-node/require-description.md)
* [require-devDependencies](rules/required-node/require-devDependencies.md)
* [require-directories](rules/required-node/require-directories.md)
* [require-engines](rules/required-node/require-engines.md)
* [require-files](rules/required-node/require-files.md)
* [require-homepage](rules/required-node/require-homepage.md)
* [require-keywords](rules/required-node/require-keywords.md)
* [require-license](rules/required-node/require-license.md)
* [require-main](rules/required-node/require-main.md)
* [require-man](rules/required-node/require-man.md)
* [require-module](rules/required-node/require-module.md)
* [require-name](rules/required-node/require-name.md)
* [require-optionalDependencies](rules/required-node/require-optionalDependencies.md)
* [require-os](rules/required-node/require-os.md)
* [require-peerDependencies](rules/required-node/require-peerDependencies.md)
* [require-preferGlobal](rules/required-node/require-preferGlobal.md)
* [require-private](rules/required-node/require-private.md)
* [require-publishConfig](rules/required-node/require-publishConfig.md)
* [require-repository-directory](rules/required-node/require-repository-directory.md)
* [require-repository](rules/required-node/require-repository.md)
* [require-scripts](rules/required-node/require-scripts.md)
* [require-types](rules/required-node/require-types.md)
* [require-typings](rules/required-node/require-typings.md)
* [require-version](rules/required-node/require-version.md)

## Type rules

> Generates an error if node's value doesn't have the correct data type

* [bin-type](rules/type/bin-type.md)
* [bundledDependencies-type](rules/type/bundledDependencies-type.md)
* [config-type](rules/type/config-type.md)
* [cpu-type](rules/type/cpu-type.md)
* [dependencies-type](rules/type/dependencies-type.md)
* [description-type](rules/type/description-type.md)
* [devDependencies-type](rules/type/devDependencies-type.md)
* [directories-type](rules/type/directories-type.md)
* [engines-type](rules/type/engines-type.md)
* [files-type](rules/type/files-type.md)
* [homepage-type](rules/type/homepage-type.md)
* [keywords-type](rules/type/keywords-type.md)
* [license-type](rules/type/license-type.md)
* [main-type](rules/type/main-type.md)
* [man-type](rules/type/man-type.md)
* [name-type](rules/type/name-type.md)
* [optionalDependencies-type](rules/type/optionalDependencies-type.md)
* [os-type](rules/type/os-type.md)
* [peerDependencies-type](rules/type/peerDependencies-type.md)
* [preferGlobal-type](rules/type/preferGlobal-type.md)
* [private-type](rules/type/private-type.md)
* [repository-type](rules/type/repository-type.md)
* [scripts-type](rules/type/scripts-type.md)
* [version-type](rules/type/version-type.md)


## Valid value rules

> Generates an error if node's value doesn't match one of the values in the supplied array

* [valid-values-author](rules/valid-values/valid-values-author.md)
* [valid-values-engines](rules/valid-values/valid-values-engines.md)
* [valid-values-license](rules/valid-values/valid-values-license.md)
* [valid-values-name-scope](rules/valid-values/valid-values-name-scope.md)
* [valid-values-private](rules/valid-values/valid-values-private.md)
* [valid-values-publishConfig](rules/valid-values/valid-values-publishConfig.md)

## Dependency rules

> Generates an error if dependencies fail to meet the rules requirements

* dependencies
  * [no-absolute-version-dependencies](rules/dependencies/no-absolute-version-dependencies.md)
  * [no-caret-version-dependencies](rules/dependencies/no-caret-version-dependencies.md)
  * [no-restricted-dependencies](rules/dependencies/no-restricted-dependencies.md)
  * [no-restricted-pre-release-dependencies](rules/dependencies/no-restricted-pre-release-dependencies.md)
  * [no-tilde-version-dependencies](rules/dependencies/no-tilde-version-dependencies.md)
  * [prefer-absolute-version-dependencies](rules/dependencies/prefer-absolute-version-dependencies.md)
  * [prefer-alphabetical-dependencies](rules/dependencies/prefer-alphabetical-dependencies.md)
  * [prefer-caret-version-dependencies](rules/dependencies/prefer-caret-version-dependencies.md)
  * [prefer-tilde-version-dependencies](rules/dependencies/prefer-tilde-version-dependencies.md)
* devDependencies
  * [no-absolute-version-devDependencies](rules/dependencies/no-absolute-version-devDependencies.md)
  * [no-caret-version-devDependencies](rules/dependencies/no-caret-version-devDependencies.md)
  * [no-restricted-devDependencies](rules/dependencies/no-restricted-devDependencies.md)
  * [no-restricted-pre-release-devDependencies](rules/dependencies/no-restricted-pre-release-devDependencies.md)
  * [no-tilde-version-devDependencies](rules/dependencies/no-tilde-version-devDependencies.md)
  * [prefer-no-version-zero-devDependencies](rules/dependencies/prefer-no-version-zero-devDependencies.md)
  * [prefer-absolute-version-devDependencies](rules/dependencies/prefer-absolute-version-devDependencies.md)
  * [prefer-alphabetical-devDependencies](rules/dependencies/prefer-alphabetical-devDependencies.md)
  * [prefer-caret-version-devDependencies](rules/dependencies/prefer-caret-version-devDependencies.md)
  * [prefer-no-version-zero-devDependencies](rules/dependencies/prefer-no-version-zero-devDependencies.md)
  * [prefer-tilde-version-devDependencies](rules/dependencies/prefer-tilde-version-devDependencies.md)
* bundledDependencies
  * [prefer-alphabetical-bundledDependencies](rules/dependencies/prefer-alphabetical-bundledDependencies.md)
* optionalDependencies
  * [prefer-alphabetical-optionalDependencies](rules/dependencies/prefer-alphabetical-optionalDependencies.md)
* peerDependencies
  * [prefer-alphabetical-peerDependencies](rules/dependencies/prefer-alphabetical-peerDependencies.md)

## Format rules

> Generates an error if node's value fails to meet the format requirements

* [description-format](rules/format/description-format.md)
* [name-format](rules/format/name-format.md)
* [version-format](rules/format/version-format.md)


## Package.json property rules

> Generates an error if the package.json properties fail to meet the desired requirements

* [prefer-property-order](rules/package-json-properties/prefer-property-order.md)


## Deprecated node rules

> Generates an error if the node is present

* [prefer-no-engineStrict](rules/deprecated-nodes/prefer-no-engineStrict)
