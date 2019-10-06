---
id: version-4.0.0-prefer-tilde-version-dependencies
title: prefer-tilde-version-dependencies
original_id: prefer-tilde-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is does not use a tilde version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-tilde-version-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-tilde-version-dependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "~0.3.0"
  }
}
```

## Related

* [prefer-absolute-version-dependencies](prefer-absolute-version-dependencies.md)
* [prefer-caret-version-dependencies](prefer-caret-version-dependencies.md)

## History

* Introduced in version 0.4.0
