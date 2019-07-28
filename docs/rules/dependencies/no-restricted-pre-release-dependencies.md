---
id: no-restricted-pre-release-dependencies
title: no-restricted-pre-release-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` has a is equal to one of the values in the array of invalid restricted and it has a pre-release version specified.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-dependencies": ["error", [
      "grunt-npm-package-json-lint"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "^1.0.0-beta.1"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "^1.0.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-dependencies": "off"
  }
}
```

## History

* Renamed from dependencies-invalid-pre-release-dependencies to no-restricted-pre-release-dependencies in version 1.0.0
* Introduced in version 0.1.0
