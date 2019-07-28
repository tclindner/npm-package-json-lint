---
id: version-3.7.0-homepage-type
title: homepage-type
original_id: homepage-type
---

Enabling this rule will result in an error being generated if the value in `homepage` is not a string.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "homepage-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "homepage": 1
}
```

```json
{
  "homepage": ["https://github.com/tclindner/npm-package-json-lint"]
}
```

```json
{
  "homepage": {
    "url": "https://github.com/tclindner/npm-package-json-lint"
  }
}
```

### *Correct* example(s)

```json
{
  "homepage": "https://github.com/tclindner/npm-package-json-lint"
}
```

## History

* Introduced in version 0.1.0
