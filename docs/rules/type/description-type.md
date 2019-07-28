---
id: description-type
title: description-type
---

Enabling this rule will result in an error being generated if the value in `description` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "description-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "description": 1
}
```

```json
{
  "description": ["CLI app for linting package.json files."]
}
```

```json
{
  "description": {
    "summary": "CLI app for linting package.json files."
  }
}
```

### *Correct* example(s)

```json
{
  "description": "CLI app for linting package.json files."
}
```

## History

* Introduced in version 0.1.0
