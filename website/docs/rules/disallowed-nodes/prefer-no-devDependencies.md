---
id: prefer-no-devDependencies
title: prefer-no-devDependencies
---

Enabling this rule will result in an error being generated if `devDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-devDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": {
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

* Introduced in version 4.0.0
