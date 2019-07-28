---
id: version-3.7.0-name-type
title: name-type
original_id: name-type
---

Enabling this rule will result in an error being generated if the value in `name` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "name-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": 1
}
```

```json
{
  "name": ["npm-package-json-lint"]
}
```

```json
{
  "name": {
    "stable": "npm-package-json-lint"
  }
}
```

### *Correct* example(s)

```json
{
  "name": "npm-package-json-lint"
}
```

## History

* Introduced in version 0.1.0
