---
id: version-3.7.0-peerDependencies-type
title: peerDependencies-type
original_id: peerDependencies-type
---

Enabling this rule will result in an error being generated if the value in `peerDependencies` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "peerDependencies-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": 1
}
```

```json
{
  "peerDependencies": ["npm-package-json-lint"]
}
```

```json
{
  "peerDependencies": "npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

## History

* Introduced in version 1.0.0
