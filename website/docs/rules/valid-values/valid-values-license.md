---
id: valid-values-license
title: valid-values-license
---

Enabling this rule will result in an error being generated if the value in `license` is not equal to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-license": ["error", [
      "private",
      "unlicensed"
     ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "license": "MIT"
}
```

### *Correct* example(s)

```json
{
  "license": "private"
}
```

```json
{
  "license": "unlicensed"
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-license": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.1.0
* Introduced in version 1.4.0
