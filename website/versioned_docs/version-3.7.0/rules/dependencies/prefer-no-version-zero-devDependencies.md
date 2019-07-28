---
id: version-3.7.0-prefer-no-version-zero-devDependencies
title: prefer-no-version-zero-devDependencies
original_id: prefer-no-version-zero-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` has a major version of 0.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-version-zero-devDependencies": "error"
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
    "gulp-npm-package-json-lint": "^1.0.0"
  }
}
```

## History

* Introduced in version 0.4.0
