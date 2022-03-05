---
id: optionalDependencies-type
title: optionalDependencies-type
---

Enabling this rule will result in an error being generated if the value in `optionalDependencies` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "optionalDependencies-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "optionalDependencies": 1
}
```

```json
{
  "optionalDependencies": ["npm-package-json-lint"]
}
```

```json
{
  "optionalDependencies": "npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "optionalDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

## History

* Introduced in version 1.0.0
