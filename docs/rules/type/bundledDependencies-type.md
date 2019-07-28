---
id: bundledDependencies-type
title: bundledDependencies-type
---

Enabling this rule will result in an error being generated if the value in `bundledDependencies` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "bundledDependencies-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "bundledDependencies": 1
}
```

```json
{
  "bundledDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "bundledDependencies": "npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "bundledDependencies": ["npm-package-json-lint"]
}
```

## History

* Fixed a bug in version 2.12.2. Updated type to check for an array instead of an object.
* Introduced in version 1.0.0
