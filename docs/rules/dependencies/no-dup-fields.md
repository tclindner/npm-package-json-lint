---
id: no-dup-fields
title: no-dup-fields
---

Enabling this rule will result in an error being generated if package.json has duplicate fields in block section.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-dup-fields": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-dup-fields": ["error", {
      "exceptions": ["myModule"]
    }]
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
    "no-dup-fields": "off"
  }
}
```

## History

* Introduced in version 4.3.0
