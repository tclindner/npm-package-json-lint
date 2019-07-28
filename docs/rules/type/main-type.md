---
id: main-type
title: main-type
---

Enabling this rule will result in an error being generated if the value in `main` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "main-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "main": 1
}
```

```json
{
  "main": ["src/NpmPackageJsonLint.js"]
}
```

```json
{
  "main": {
    "app": "src/NpmPackageJsonLint.js"
  }
}
```

### *Correct* example(s)

```json
{
  "main": "src/NpmPackageJsonLint.js"
}
```

## History

* Introduced in version 0.1.0
