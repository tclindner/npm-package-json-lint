---
id: require-config
title: require-config
---

Enabling this rule will result in an error being generated if `config` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-config": "error"
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
  "config": {
    "port": "8080"
  }
}
```

## History

* Introduced in version 1.0.0
