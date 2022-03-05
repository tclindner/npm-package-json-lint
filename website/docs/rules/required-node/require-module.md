---
id: require-module
title: require-module
---

Enabling this rule will result in an error being generated if `module` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-module": "error"
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
  "module": "src/NpmPackageJsonLint.js"
}
```

## History

* Introduced in version 2.11.0
