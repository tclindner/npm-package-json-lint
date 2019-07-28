---
id: version-3.7.0-require-name
title: require-name
original_id: require-name
---

Enabling this rule will result in an error being generated if `name` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-name": "error"
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
  "name": "npm-package-json-lint"
}
```

## History

* Renamed from name-required to require-name in version 1.0.0
* Introduced in version 0.1.0
