---
id: version-3.7.0-prefer-tilde-version-devDependencies
title: prefer-tilde-version-devDependencies
original_id: prefer-tilde-version-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` is does not use a tilde version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-tilde-version-devDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "~0.3.0"
  }
}
```

## Related

* [prefer-absolute-version-devDependencies](prefer-absolute-version-devDependencies.md)
* [prefer-caret-version-devDependencies](prefer-caret-version-devDependencies.md)

## History

* Introduced in version 0.4.0
