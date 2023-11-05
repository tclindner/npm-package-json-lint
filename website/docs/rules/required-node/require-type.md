---
id: require-type
title: require-type
---

Enabling this rule will result in an error being generated if `type` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-type": "error"
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
  "type": "module"
}
```

## History

* Introduced in version 7.0.1
