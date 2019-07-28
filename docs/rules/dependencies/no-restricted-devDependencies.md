---
id: no-restricted-devDependencies
title: no-restricted-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` is equal to one of the values in the array of restricted dependencies.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-devDependencies": ["error", [
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
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-devDependencies": "off"
  }
}
```

## History

* Renamed from devDependencies-invalid-dependencies to no-restricted-devDependencies in version 1.0.0
* Introduced in version 0.1.0
