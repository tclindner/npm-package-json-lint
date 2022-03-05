---
id: prefer-scripts
title: prefer-scripts
---

Enabling this rule will result in an error being generated if the package.json `scripts` object does not contain all preferred scripts.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-scripts": ["error", [
      "lint",
      "test"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "scripts": {
    "lint": "npmPkgJsonLint ."
  }
}
```

### *Correct* example(s)

```json
{
  "scripts": {
    "lint": "npmPkgJsonLint .",
    "test": "jest"
  }
}
```

```json
{
  "scripts": {
    "lint": "npmPkgJsonLint .",
    "start": "node src/index.js",
    "test": "jest"
  }
}
```

## History

* Introduced in version 5.1.0
