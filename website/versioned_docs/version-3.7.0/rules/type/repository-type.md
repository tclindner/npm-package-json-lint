---
id: version-3.7.0-repository-type
title: repository-type
original_id: repository-type
---

Enabling this rule will result in an error being generated if the value in `repository` is not either a string nor an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "repository-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "repository": 1
}
```

```json
{
  "repository": ["https://github.com/tclindner/npm-package-json-lint.git"]
}
```

### *Correct* example(s)

```json
{
  "repository": "tclindner/npm-package-json-lint"
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

## History

* Introduced in version 0.1.0
