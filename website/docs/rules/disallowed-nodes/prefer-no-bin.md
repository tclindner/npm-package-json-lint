---
id: prefer-no-bin
title: prefer-no-bin
---

Enabling this rule will result in an error being generated if `bin` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-bin": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "bin": {
    "pjl-cli": "src/cli.js"
  }
}
```

### *Correct* example(s)

```json
{

}
```

## History

* Introduced in version 10.3.0
