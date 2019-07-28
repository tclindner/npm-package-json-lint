---
id: require-license
title: require-license
---

Enabling this rule will result in an error being generated if `license` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "required-license": "error"
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
  "license": "MIT"
}
```

## History

* Renamed from license-required to require-license in version 1.0.0
* Introduced in version 0.1.0
