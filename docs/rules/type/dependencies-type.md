---
id: dependencies-type
title: dependencies-type
---

Enabling this rule will result in an error being generated if the value in `dependencies` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "dependencies-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": 1
}
```

```json
{
  "dependencies": ["npm-package-json-lint"]
}
```

```json
{
  "dependencies": "npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

## History

* Introduced in version 0.1.0
