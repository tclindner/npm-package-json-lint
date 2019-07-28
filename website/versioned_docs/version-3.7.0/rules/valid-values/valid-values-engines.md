---
id: version-3.7.0-valid-values-engines
title: valid-values-engines
original_id: valid-values-engines
---

Enabling this rule will result in an error being generated if the value in `engines` is not equal to one of the values in the array of valid values or if the version range is invalid.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-engines": ["error", [
      {"node": "^6.0.0"}
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "engines": "^6.0.0"
}
```

```json
{
  "engines": {
    "node": "^8.0.0"
  }
}
```

```json
{
  "engines": {
    "node": "^6.a.0"
  }
}
```

### *Correct* example(s)

```json
{
  "engines": {
    "node": "^6.0.0"
  }
}
```


## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-engines": "off"
  }
}
```

## History

* Introduced in version 3.1.0
