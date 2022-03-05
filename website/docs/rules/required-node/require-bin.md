---
id: require-bin
title: require-bin
---

Enabling this rule will result in an error being generated if `bin` is missing from the package.json file.

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

}
```

### *Correct* example(s)

```json
{
  "bin": {
    "pjl-cli": "src/cli.js"
  }
}
```

## History

* Introduced in version 1.0.0
