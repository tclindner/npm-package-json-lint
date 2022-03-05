---
id: cpu-type
title: cpu-type
---

Enabling this rule will result in an error being generated if the value in `cpu` is not an array.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "cpu-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "cpu": 1
}
```

```json
{
  "cpu": {
    "arch": "x64"
  }
}
```

```json
{
  "cpu": "x64"
}
```

### *Correct* example(s)


```json
{
  "cpu": ["x64"]
}
```

## History

* Introduced in version 1.0.0
