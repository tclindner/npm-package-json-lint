---
id: version-4.1.0-prefer-no-dependencies
title: prefer-no-dependencies
original_id: prefer-no-dependencies
---

Enabling this rule will result in an error being generated if `dependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-dependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
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
