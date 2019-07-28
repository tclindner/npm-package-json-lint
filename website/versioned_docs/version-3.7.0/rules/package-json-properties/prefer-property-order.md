---
id: version-3.7.0-prefer-property-order
title: prefer-property-order
original_id: prefer-property-order
---

Enabling this rule will result in an error being generated if the package.json properties are not in the specified order.

> Note: Not all properties in the preferred property order array need to be present in the package.json file. Please see the second example in the "correct examples" below as a reference. `description` is in the preferred list, but isn't included in the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-property-order": ["error", [
      "name",
      "version",
      "description"
    ]]
  }
}
```

If an empty array is provided (see example below) then the following list will be used as the default sort order.

```json
{
  "rules": {
    "prefer-property-order": ["error", []]
  }
}
```

```js
[
    'name',
    'version',
    'description',
    'keywords',
    'homepage',
    'bugs',
    'license',
    'author',
    'contributors',
    'files',
    'main',
    'module',
    'jsnext:main',
    'types',
    'typings',
    'style',
    'example',
    'examplestyle',
    'assets',
    'bin',
    'man',
    'directories',
    'repository',
    'scripts',
    'config',
    'pre-commit',
    'browser',
    'browserify',
    'babel',
    'eslintConfig',
    'stylelint',
    'npmPackageJsonLintConfig',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'bundledDependencies',
    'bundleDependencies',
    'optionalDependencies',
    'engines',
    'engineStrict',
    'os',
    'cpu',
    'preferGlobal',
    'private',
    'publishConfig',
]
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": "npm-package-json-lint",
  "description": "CLI app for linting package.json files.",
  "version": "1.0.0"
}
```

### *Correct* example(s)

```json
{
  "name": "npm-package-json-lint",
  "version": "1.0.0",
  "description": "CLI app for linting package.json files."
}
```

```json
{
  "name": "npm-package-json-lint",
  "version": "1.0.0"
}
```

## History

* Updated in 2.10.0 to address issues [#57](https://github.com/tclindner/npm-package-json-lint/issues/57) and [#58](https://github.com/tclindner/npm-package-json-lint/issues/58). This change gives better recommendations for what change is required by the user to resolve the lint issue. It also no longer throws an error when a property exists in the package.json file that doesn't exist in the preferred property order array.
* Updated in 2.8.1 to handle properties that aren't in the package.json file. Please see [#50](https://github.com/tclindner/npm-package-json-lint/issues/50). A default list was also added if an empty array is provided.
* Introduced in version 2.8.0
