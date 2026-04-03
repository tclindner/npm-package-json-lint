---
id: no-restricted-pre-release-peerDependencies
title: no-restricted-pre-release-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` has a is equal to one of the values in the array of restricted dependencies and it has a pre-release version specified.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-peerDependencies": ["error", [
      "npm-package-json-lint"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "^1.0.0-beta.1"
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

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-pre-release-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
