---
id: version-3.7.0-require-scripts
title: require-scripts
original_id: require-scripts
---

Enabling this rule will result in an error being generated if `scripts` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-scripts": "error"
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
  "scripts": {
    "install": "bower install"
  }
}
```

## History

* Introduced in version 1.0.0
