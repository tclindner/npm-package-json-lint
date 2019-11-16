---
id: version-4.2.0-prefer-alphabetical-scripts
title: prefer-alphabetical-scripts
original_id: prefer-alphabetical-scripts
---

Enabling this rule will result in an error being generated if the scripts in `scripts` are not in alphabetical order.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-alphabetical-scripts": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "scripts": {
    "build": "build script",
    "test": "jest",
    "start": "node index.js"
  }
}
```

### *Correct* example(s)

```json
{
  "scripts": {
    "build": "build script",
    "start": "node index.js",
    "test": "jest"
  }
}
```

## History

* Introduced in version 4.2.0
