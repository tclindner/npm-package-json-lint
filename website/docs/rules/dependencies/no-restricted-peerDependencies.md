---
id: no-restricted-peerDependencies
title: no-restricted-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` is equal to one of the values in the array of restricted dependencies.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-peerDependencies": ["error", [
      "grunt-npm-package-json-lint",
      "@types/*"
    ]]
  }
}
```

```json
{
  "rules": {
    "no-restricted-peerDependencies": ["error", [
      {
        "name": "grunt-npm-package-json-lint",
        "replacement": "gulp-npm-package-json-lint"
      },
      {
        "name": "@types/*",
        "replacement": "@new-types/*"
      }
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "@types/node": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
