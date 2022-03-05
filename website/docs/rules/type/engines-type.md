---
id: engines-type
title: engines-type
---

Enabling this rule will result in an error being generated if the value in `engines` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "engines-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "engines": 4.2
}
```

```json
{
  "engines": ["node", ">=4.2.0"]
}
```

```json
{
  "engines": "node: >=4.2.0"
}
```

### *Correct* example(s)

```json
{
  "engines": {
    "node": ">=4.2.0",
    "npm": ">=2.14.7"
  }
}
```

## History

* Introduced in version 0.1.0
