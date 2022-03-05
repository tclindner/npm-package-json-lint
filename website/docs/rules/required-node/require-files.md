---
id: require-files
title: require-files
---

Enabling this rule will result in an error being generated if `files` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-files": "error"
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
  "files": ["index.js"]
}
```

## History

* Introduced in version 1.0.0
