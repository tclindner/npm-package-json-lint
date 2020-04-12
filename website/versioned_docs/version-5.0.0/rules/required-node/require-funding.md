---
id: version-5.0.0-require-funding
title: require-funding
original_id: require-funding
---

Enabling this rule will result in an error being generated if `funding` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-funding": "error"
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
  "funding": "https://github.com/ORG/REPO?sponsor=1"
}
```

## History

* Introduced in version 5.0.0
