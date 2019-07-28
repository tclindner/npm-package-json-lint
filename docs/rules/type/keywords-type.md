---
id: keywords-type
title: keywords-type
---

Enabling this rule will result in an error being generated if the value in `keywords` is not an array.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "keywords-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "keywords": 2
}
```

```json
{
  "keywords": "linter, package"
}
```

```json
{
  "keywords": {
    "linter": "true",
    "package": "true"
  }
}
```

### *Correct* example(s)

```json
{
  "keywords": ["linter", "package"]
}
```

## History

* Introduced in version 0.1.0
