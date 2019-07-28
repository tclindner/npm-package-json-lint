---
id: version-3.7.0-require-cpu
title: require-cpu
original_id: require-cpu
---

Enabling this rule will result in an error being generated if `cpu` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-cpu": "error"
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
  "cpu": ["x64"]
}
```

## History

* Introduced in version 1.0.0
