---
id: require-engines
title: require-engines
---

Enabling this rule will result in an error being generated if `engines` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-engines": "error"
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
  "engines": {
    "node": ">=4.2.0",
    "npm": ">=2.14.7"
  }
}
```

## History

* Renamed from engines-required to require-engines in version 1.0.0
* Introduced in version 0.1.0
