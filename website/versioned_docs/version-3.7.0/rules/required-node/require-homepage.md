---
id: version-3.7.0-require-homepage
title: require-homepage
original_id: require-homepage
---

Enabling this rule will result in a warning being generated if `homepage` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-homepage": "error"
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
  "homepage": "https://github.com/tclindner/npm-package-json-lint"
}
```

## History

* Renamed from homepage-recommended to require-homepage in version 1.0.0
* Introduced in version 0.1.0
