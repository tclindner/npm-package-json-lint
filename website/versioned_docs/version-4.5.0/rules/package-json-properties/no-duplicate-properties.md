---
id: version-4.5.0-no-duplicate-properties
title: no-duplicate-properties
original_id: no-duplicate-properties
---

Enabling this rule will result in an error being generated if package.json has duplicate properties in block section.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-duplicate-properties": "error"
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "name": "packageName",
  "name": "packageName"
}
```

### *Correct* examples

```json
{
  "name": "packageName"
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-duplicate-properties": "off"
  }
}
```

## History

* Introduced in version 4.5.0
