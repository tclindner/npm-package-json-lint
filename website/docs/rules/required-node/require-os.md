---
id: require-os
title: require-os
---

Enabling this rule will result in an error being generated if `os` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-os": "error"
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
  "os": ["linux"]
}
```

## History

* Introduced in version 1.0.0
