---
id: version-3.7.0-private-type
title: private-type
original_id: private-type
---

Enabling this rule will result in an error being generated if the value in `private` is not a boolean.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "private-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "private": 1
}
```

```json
{
  "private": ["true"]
}
```

```json
{
  "private": "true"
}
```

```json
{
  "private": {
    "enabled": "true"
  }
}
```

### *Correct* example(s)

```json
{
  "private": true
}
```

## History

* Introduced in version 0.1.0
