---
id: prefer-no-version-zero-peerDependencies
title: prefer-no-version-zero-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` has a major version of 0.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-version-zero-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-version-zero-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
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

* Introduced in version 10.1.0
