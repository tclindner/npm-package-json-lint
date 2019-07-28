---
id: version-3.7.0-require-version
title: require-version
original_id: require-version
---

Enabling this rule will result in an error being generated if `version` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-version": "error"
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
  "version": "1.0.0"
}
```

## History

* Renamed from version-required to require-version in version 1.0.0
* Introduced in version 0.1.0
