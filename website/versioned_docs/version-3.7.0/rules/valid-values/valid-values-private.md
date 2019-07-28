---
id: version-3.7.0-valid-values-private
title: valid-values-private
original_id: valid-values-private
---

Enabling this rule will result in an error being generated if the value in `private` is not equal to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-private": ["error", [
      false
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "private": true
}
```

### *Correct* example(s)

```json
{
  "private": false
}
```

## Example .npmpackagejsonlintrc configuration

```json
{
  "private": [
    false,
    true
  ]
}
```

## Rule Details

### *Incorrect* example(s)

N/A

### *Correct* example(s)

```json
{
  "private": false
}
```

```json
{
  "private": true
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-private": "off"
  }
}
```

## History

* Renamed from private-valid-values to valid-values-private in version 1.0.0
* Introduced in version 0.1.0
