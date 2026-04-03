---
id: prefer-no-main
title: prefer-no-main
---

Enabling this rule will result in an error being generated if `main` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-main": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "main": "src/NpmPackageJsonLint.js"
}
```

### *Correct* example(s)

```json
{
}
```

## History

* Introduced in version 10.2.0
