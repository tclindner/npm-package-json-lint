---
id: version-3.7.0-bin-type
title: bin-type
original_id: bin-type
---

Enabling this rule will result in an error being generated if the value in `bin` is not either a string nor an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "bin-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "bin": 123
}
```

```json
{
  "bin": ["123"]
}
```

### *Correct* example(s)

```json
{
  "bin": "src/cli.js"
}
```

```json
{
  "bin": {
    "pjl-cli": "src/cli.js"
  }
}
```

## History

* Introduced in version 0.1.0
