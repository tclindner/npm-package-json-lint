---
id: version-3.7.0-require-peerDependencies
title: require-peerDependencies
original_id: require-peerDependencies
---

Enabling this rule will result in an error being generated if `peerDependencies` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-peerDependencies": "error"
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
  "peerDependencies": {
    "npm-package-json-lint": "^1.0.0"
  }
}
```

## History

* Introduced in version 1.0.0
