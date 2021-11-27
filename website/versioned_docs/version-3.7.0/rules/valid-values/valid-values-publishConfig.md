---
id: version-3.7.0-valid-values-publishConfig
title: valid-values-publishConfig
original_id: valid-values-publishConfig
---

Enabling this rule will result in an error being generated if the value in `publishConfig` is not equal to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-publishConfig": ["error", [
      {"access": "public"}
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "publishConfig": "public"
}
```

```json
{
  "publishConfig": {
    "access": "private"
  }
}
```

### *Correct* example(s)

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-publishConfig": "off"
  }
}
```

## History

* Introduced in version 3.0.0
