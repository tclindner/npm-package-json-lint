---
id: prefer-caret-version-peerDependencies
title: prefer-caret-version-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` is does not use a caret version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-caret-version-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-caret-version-peerDependencies": ["error", {
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
    "npm-package-json-lint": "~0.3.0"
  }
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

## Related

* [prefer-absolute-version-peerDependencies](prefer-absolute-version-peerDependencies.md)
* [prefer-tilde-version-peerDependencies](prefer-tilde-version-peerDependencies.md)

## History

* Introduced in version 10.1.0
