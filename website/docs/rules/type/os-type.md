---
id: os-type
title: os-type
---

Enabling this rule will result in an error being generated if the value in `os` is not an array.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "os-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "os": 1
}
```

```json
{
  "os": {
    "name": "linux"
  }
}
```

```json
{
  "os": "linux"
}
```

### *Correct* example(s)


```json
{
  "os": ["linux"]
}
```

## History

* Introduced in version 1.0.0
