---
id: version-4.0.0-prefer-no-devDependencies
title: prefer-no-devDependencies
original_id: prefer-no-devDependencies
---

Enabling this rule will result in an error being generated if `devDependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-devDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```


## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": "dummy-value"
}
```

### *Correct* example(s)

```json
{
  "prefer-no-devDependencies": "error"
}
```

## History

* Introduced in version 4.0.0
