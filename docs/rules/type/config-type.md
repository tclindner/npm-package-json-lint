---
id: config-type
title: config-type
---

Enabling this rule will result in an error being generated if the value in `config` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "config-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "config": 8080
}
```

```json
{
  "config": ["port", "8080"]
}
```

```json
{
  "config": "port: 8080"
}
```

### *Correct* example(s)

```json
{
  "config": {
    "port": "8080"
  }
}
```

## History

* Introduced in version 0.1.0
