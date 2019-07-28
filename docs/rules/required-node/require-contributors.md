---
id: require-contributors
title: require-contributors
---

Enabling this rule will result in an error being generated if `contributors` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-contributors": "error"
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
  "contributors": [
    {
      "name": "Thomas Lindner"
    }
  ]
}
```

## History

* Introduced in version 1.0.0
