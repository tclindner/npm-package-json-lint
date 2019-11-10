---
id: version-4.1.0-prefer-no-optionalDependencies
title: prefer-no-optionalDependencies
original_id: prefer-no-optionalDependencies
---

Enabling this rule will result in an error being generated if `optionalDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-optionalDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-optionalDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```


## Rule Details

### *Incorrect* example(s)

```json
{
  "optionalDependencies": "dummy-value"
}
```

### *Correct* example(s)

```json
{
  "prefer-no-optionalDependencies": "error"
}
```

## History

* Introduced in version 4.1.0
