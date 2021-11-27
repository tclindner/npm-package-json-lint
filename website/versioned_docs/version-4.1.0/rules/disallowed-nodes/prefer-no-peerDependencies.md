---
id: version-4.1.0-prefer-no-peerDependencies
title: prefer-no-peerDependencies
original_id: prefer-no-peerDependencies
---

Enabling this rule will result in an error being generated if `peerDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-peerDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
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
