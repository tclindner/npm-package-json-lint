---
id: version-3.7.0-require-devDependencies
title: require-devDependencies
original_id: require-devDependencies
---

Enabling this rule will result in an error being generated if `devDependencies` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-devDependencies": "error"
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
  "devDependencies": {
    "npm-package-json-lint": "^1.0.0"
  }
}
```

## History

* Introduced in version 1.0.0
