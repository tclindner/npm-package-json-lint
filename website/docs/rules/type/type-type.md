---
id: type-type
title: type-type
---

Enabling this rule will result in an error being generated if the value in `type` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "type-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "type": 1
}
```

```json
{
  "type": ["true"]
}
```

```json
{
  "type": true
}
```

```json
{
  "type": {
    "enabled": "true"
  }
}
```

### *Correct* example(s)

```json
{
  "type": "module"
}
```

## History

* Introduced in version 7.0.1
