---
id: prefer-alphabetical-optionalDependencies
title: prefer-alphabetical-optionalDependencies
---

Enabling this rule will result in an error being generated if the dependencies in `optionalDependencies` are not in alphabetical order.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-alphabetical-optionalDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "optionalDependencies": {
    "semver": "^5.3.0",
    "chalk": "^1.1.3",
    "user-home": "^2.0.0"
  }
}
```

### *Correct* example(s)

```json
{
  "optionalDependencies": {
    "chalk": "^1.1.3",
    "semver": "^5.3.0",
    "user-home": "^2.0.0"
  }
}
```

## History

* Introduced in version 2.3.0
