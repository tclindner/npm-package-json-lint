---
id: valid-values-author
title: valid-values-author
---

Enabling this rule will result in an error being generated if the value in `author` is not equal to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-author": ["error", [
      "Thomas",
      "Thomas Lindner"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "author": "Lindner"
}
```

```json
{
  "author": {
    "name": "Lindner"
  }
}
```

### *Correct* example(s)

```json
{
  "author": "Thomas"
}
```

```json
{
  "author": {
    "name": "Thomas"
  }
}
```

```json
{
  "author": "Thomas Lindner"
}
```

```json
{
  "author": {
    "name": "Thomas Lindner"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-author": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.1.0
* Renamed from author-valid-values to valid-values-author in version 1.0.0
* Introduced in version 0.1.0
