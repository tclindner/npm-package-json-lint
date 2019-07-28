---
id: version-3.7.0-require-private
title: require-private
original_id: require-private
---

Enabling this rule will result in an error being generated if `private` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-private": "error"
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
  "private": false
}
```

## History

* Introduced in version 1.0.0
