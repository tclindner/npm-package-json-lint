---
id: prefer-no-engineStrict
title: prefer-no-engineStrict
---

Enabling this rule will result in an error being generated if `engineStrict` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-engineStrict": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "engineStrict": "dummy-value"
}
```

### *Correct* example(s)

```json
{

}
```

## History

* Introduced in version 1.3.0
