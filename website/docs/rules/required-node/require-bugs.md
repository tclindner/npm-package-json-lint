---
id: require-bugs
title: require-bugs
---

Enabling this rule will result in a warning being generated if `bugs` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-bugs": "error"
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
  "bugs": {
    "url": "https://github.com/tclindner/npm-package-json-lint/issues"
  }
}
```

## History

* Renamed from bugs-recommended to require-bugs in version 1.0.0
* Introduced in version 0.1.0
