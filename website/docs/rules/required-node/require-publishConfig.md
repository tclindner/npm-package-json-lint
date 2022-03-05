---
id: require-publishConfig
title: require-publishConfig
---

Enabling this rule will result in an error being generated if `publishConfig` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-publishConfig": "error"
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
  "publishConfig": {
    "port": "8080"
  }
}
```

## History

* Introduced in version 1.0.0
