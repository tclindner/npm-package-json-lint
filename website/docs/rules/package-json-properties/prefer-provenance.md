---
id: prefer-provenance
title: prefer-provenance
---

Enabling this rule will result in an error being generated if `publishConfig.provenance` is not `true` (unless `private` is set to `true`, which means the package is not published).

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-provenance": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": "packageName",
  "publishConfig": {
    "provenance": false
  }
}
```

```json
{
  "name": "packageName"
}
```

### *Correct* example(s)

```json
{
  "name": "packageName",
  "publishConfig": {
    "provenance": true
  }
}
```

```json
{
  "name": "packageName",
  "private": true
}
```

## History

* Introduced in version 10.4.0
