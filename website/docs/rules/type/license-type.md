---
id: license-type
title: license-type
---

Enabling this rule will result in an error being generated if the value in `license` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "license-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "license": 1
}
```

```json
{
  "license": ["MIT"]
}
```

```json
{
  "license": {
    "code": "MIT"
  }
}
```

### *Correct* example(s)

```json
{
  "license": "MIT"
}
```

## History

* Introduced in version 0.1.0
