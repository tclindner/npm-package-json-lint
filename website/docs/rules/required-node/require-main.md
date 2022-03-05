---
id: require-main
title: require-main
---

Enabling this rule will result in an error being generated if `main` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-main": "error"
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
  "main": "src/NpmPackageJsonLint.js"
}
```

## History

* Introduced in version 1.0.0
