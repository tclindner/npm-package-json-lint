---
id: prefer-caret-version-devDependencies
title: prefer-caret-version-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` is does not use a caret version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-caret-version-devDependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "~0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Related

* [prefer-absolute-version-devDependencies](prefer-absolute-version-devDependencies.md)
* [prefer-tilde-version-devDependencies](prefer-tilde-version-devDependencies.md)

## History

* Introduced in version 0.4.0
