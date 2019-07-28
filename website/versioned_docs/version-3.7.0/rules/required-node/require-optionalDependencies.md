---
id: version-3.7.0-require-optionalDependencies
title: require-optionalDependencies
original_id: require-optionalDependencies
---

Enabling this rule will result in an error being generated if `optionalDependencies` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-optionalDependencies": "error"
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
  "optionalDependencies": {
    "npm-package-json-lint": "^1.0.0"
  }
}
```

## History

* Introduced in version 1.0.0
