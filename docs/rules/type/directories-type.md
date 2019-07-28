---
id: directories-type
title: directories-type
---

Enabling this rule will result in an error being generated if the value in `directories` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "directories-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "directories": 1
}
```

```json
{
  "directories": ["bin", "./bin"]
}
```

```json
{
  "directories": "bin: ./bin"
}
```

### *Correct* example(s)

```json
{
  "directories": {
    "bin": "./bin"
  }
}
```

## History

* Introduced in version 0.1.0
