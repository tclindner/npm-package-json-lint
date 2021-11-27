---
id: version-3.7.0-preferGlobal-type
title: preferGlobal-type
original_id: preferGlobal-type
---

Enabling this rule will result in an error being generated if the value in `preferGlobal` is not a boolean.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "preferGlobal-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "preferGlobal": 1
}
```

```json
{
  "preferGlobal": ["true"]
}
```

```json
{
  "preferGlobal": "true"
}
```

```json
{
  "preferGlobal": {
    "enabled": "true"
  }
}
```

### *Correct* example(s)

```json
{
  "preferGlobal": true
}
```

## History

* Introduced in version 0.1.0
