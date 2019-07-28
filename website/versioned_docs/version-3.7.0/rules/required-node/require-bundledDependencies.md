---
id: version-3.7.0-require-bundledDependencies
title: require-bundledDependencies
original_id: require-bundledDependencies
---

Enabling this rule will result in an error being generated if `bundledDependencies` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-bundledDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{

}
```

### *Correct* example(s)

```json
{
  "bundledDependencies": {
    "grunt-npm-package-json-lint": "^3.0.0"
  }
}
```

## History

* Introduced in version 1.0.0
