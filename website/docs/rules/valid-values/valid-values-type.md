---
id: valid-values-type
title: valid-values-type
---

Enabling this rule will result in an error being generated if the value in `type` is not equal to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-type": ["error", [
      "module"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "type": "commonjs"
}
```

### *Correct* example(s)

```json
{
  "type": "module"
}
```

## Example .npmpackagejsonlintrc configuration

```json
{
  "type": [
    "commonjs",
    "module"
  ]
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "type": "type"
}
```

### *Correct* example(s)

```json
{
  "type": "commonjs"
}
```

```json
{
  "type": "module"
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-type": "off"
  }
}
```

## History

* Introduced in version 7.0.1
