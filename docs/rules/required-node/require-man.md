---
id: require-man
title: require-man
---

Enabling this rule will result in an error being generated if `man` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-man": "error"
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
  "man": "./man/doc.1"
}
```

## History

* Introduced in version 1.0.0
