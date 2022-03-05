---
id: no-restricted-pre-release-devDependencies
title: no-restricted-pre-release-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` has a is equal to one of the values in the array of restricted dependencies and it has a pre-release version specified.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-devDependencies": ["error", [
      "grunt-npm-package-json-lint"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "^1.0.0-beta.1"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^1.0.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-devDependencies": "off"
  }
}
```

## History

* Renamed from devDependencies-invalid-pre-release-dependencies to no-restricted-pre-release-devDependencies in version 1.0.0
* Introduced in version 0.1.0
