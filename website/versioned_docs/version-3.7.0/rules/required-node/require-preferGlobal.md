---
id: version-3.7.0-require-preferGlobal
title: require-preferGlobal
original_id: require-preferGlobal
---

Enabling this rule will result in an error being generated if `preferGlobal` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-preferGlobal": "error"
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
  "preferGlobal": false
}
```

## History

* Introduced in version 1.0.0
