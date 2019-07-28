---
id: files-type
title: files-type
---

Enabling this rule will result in an error being generated if the value in `files` is not an array.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "files-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "files": 2
}
```

```json
{
  "files": "src, tests"
}
```

```json
{
  "files": {
    "src": "true",
    "tests": "true"
  }
}
```

### *Correct* example(s)

```json
{
  "files": ["src", "tests"]
}
```

## History

* Introduced in version 0.1.0
