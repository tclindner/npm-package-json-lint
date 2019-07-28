---
id: version-3.7.0-name-format
title: name-format
original_id: name-format
---

Enabling this rule will result in an error being generated if `name` is not lowercase.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "name-format": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": "NPM-Package-JSON-Lint"
}
```

### *Correct* example(s)

```json
{
  "name": "npm-package-json-lint"
}
```

## History

* Introduced in version 1.0.0
