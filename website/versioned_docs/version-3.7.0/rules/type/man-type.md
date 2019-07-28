---
id: version-3.7.0-man-type
title: man-type
original_id: man-type
---

Enabling this rule will result in an error being generated if the value in `man` is not either a string nor an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "man-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "man": true
}
```

```json
{
  "man": {
    "https://github.com/tclindner/npm-package-json-lint.git": true
  }
}
```

### *Correct* example(s)

```json
{
  "man": "./man/doc.1"
}
```

```json
{
  "man": [
    "./man/foo.1",
    "./man/bar.1"
  ]
}
```

## History

* Introduced in version 0.1.0
