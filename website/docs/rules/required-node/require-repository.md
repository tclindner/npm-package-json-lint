---
id: require-repository
title: require-repository
---

Enabling this rule will result in an error being generated if `repository` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-repository": "error"
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
  "repository": {
    "type": "git",
    "url": "https://github.com/tclindner/npm-package-json-lint.git"
  }
}
```

## History

* Renamed from repository-required to require-repository in version 1.0.0
* Introduced in version 0.1.0
