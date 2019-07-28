---
id: prefer-caret-version-dependencies
title: prefer-caret-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is does not use a caret version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-caret-version-dependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "~0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Related

* [prefer-absolute-version-dependencies](prefer-absolute-version-dependencies.md)
* [prefer-tilde-version-dependencies](prefer-tilde-version-dependencies.md)

## History

* Introduced in version 0.4.0
