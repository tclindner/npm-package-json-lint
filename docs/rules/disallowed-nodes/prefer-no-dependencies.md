---
id: prefer-no-dependencies
title: prefer-no-dependencies
---

Enabling this rule will result in an error being generated if `dependencies` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-dependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```


## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": "dummy-value"
}
```

### *Correct* example(s)

```json
{
  "prefer-no-dependencies": "error"
}
```

## History

* Introduced in version 4.1.0
