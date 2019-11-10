---
id: version-4.1.0-prefer-no-optionalDependencies
title: prefer-no-optionalDependencies
original_id: prefer-no-optionalDependencies
---

Enabling this rule will result in an error being generated if `optionalDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-optionalDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "optionalDependencies": {
    "npm-package-json-lint-config-default": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{

}
```

## History

* Introduced in version 4.1.0
