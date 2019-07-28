---
id: version-3.7.0-require-dependencies
title: require-dependencies
original_id: require-dependencies
---

Enabling this rule will result in an error being generated if `dependencies` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-dependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{

}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "npm-package-json-lint": "^1.0.0"
  }
}
```

## History

* Introduced in version 1.0.0
