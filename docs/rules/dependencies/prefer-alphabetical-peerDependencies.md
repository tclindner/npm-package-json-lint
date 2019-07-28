---
id: prefer-alphabetical-peerDependencies
title: prefer-alphabetical-peerDependencies
---

Enabling this rule will result in an error being generated if the dependencies in `peerDependencies` are not in alphabetical order.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-alphabetical-peerDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "semver": "^5.3.0",
    "chalk": "^1.1.3",
    "user-home": "^2.0.0"
  }
}
```

### *Correct* example(s)

```json
{
  "peerDependencies": {
    "chalk": "^1.1.3",
    "semver": "^5.3.0",
    "user-home": "^2.0.0"
  }
}
```

## History

* Introduced in version 2.3.0
