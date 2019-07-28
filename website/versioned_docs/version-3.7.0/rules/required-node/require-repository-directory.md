---
id: version-3.7.0-require-repository-directory
title: require-repository-directory
original_id: require-repository-directory
---

Enabling this rule will result in an error being generated if `repository.directory` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-repository-directory": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{

}
```

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/tclindner/npm-package-json-lint.git"
  }
}
```

### *Correct* example(s)

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/tclindner/npm-package-json-lint.git",
    "directory": "packages/somepackage"
  }
}
```

## History

* Introduced in version 3.6.0
