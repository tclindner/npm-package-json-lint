---
id: version-3.7.0-require-directories
title: require-directories
original_id: require-directories
---

Enabling this rule will result in an error being generated if `directories` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-directories": "error"
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
  "directories": "..."
}
```

## History

* Introduced in version 1.0.0
