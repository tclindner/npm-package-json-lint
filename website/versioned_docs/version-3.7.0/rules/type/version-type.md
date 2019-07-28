---
id: version-3.7.0-version-type
title: version-type
original_id: version-type
---

Enabling this rule will result in an error being generated if the value in `version` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "version-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "version": 1.0
}
```

```json
{
  "version": ["1.0.0"]
}
```

```json
{
  "version": {
    "stable": "1.0.0"
  }
}
```

### *Correct* example(s)

```json
{
  "version": "1.0.0"
}
```

## History

* Introduced in version 0.1.0
