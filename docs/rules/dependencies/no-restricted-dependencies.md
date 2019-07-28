---
id: no-restricted-dependencies
title: no-restricted-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is equal to one of the values in the array of restricted dependencies.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-dependencies": ["error", [
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
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-dependencies": "off"
  }
}
```

## History

* Renamed from dependencies-invalid-dependencies to no-restricted-dependencies in version 1.0.0
* Introduced in version 0.1.0
