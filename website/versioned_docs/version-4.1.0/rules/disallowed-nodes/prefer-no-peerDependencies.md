---
id: version-4.1.0-prefer-no-peerDependencies
title: prefer-no-peerDependencies
original_id: prefer-no-peerDependencies
---

Enabling this rule will result in an error being generated if `peerDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```


## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": "dummy-value"
}
```

### *Correct* example(s)

```json
{
  "prefer-no-peerDependencies": "error"
}
```

## History

* Introduced in version 4.1.0
