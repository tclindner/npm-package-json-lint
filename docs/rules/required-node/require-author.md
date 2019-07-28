---
id: require-author
title: require-author
---

Enabling this rule will result in an error being generated if `author` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-author": "error"
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
  "author": "Thomas Lindner"
}
```

## History

* Renamed from author-required to require-author in version 1.0.0
* Introduced in version 0.1.0
