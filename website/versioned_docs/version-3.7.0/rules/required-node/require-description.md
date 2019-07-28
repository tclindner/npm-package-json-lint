---
id: version-3.7.0-require-description
title: require-description
original_id: require-description
---

Enabling this rule will result in an error being generated if `description` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-description": "error"
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
  "description": "CLI app for linting package.json files."
}
```

## History

* Renamed from description-required to require-description in version 1.0.0
* Introduced in version 0.1.0
