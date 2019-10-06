---
id: version-4.0.0-prefer-no-version-zero-dependencies
title: prefer-no-version-zero-dependencies
original_id: prefer-no-version-zero-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` has a major version of 0.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-version-zero-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-no-version-zero-dependencies": ["error", {
      "exceptions": ["myModule"]
    }]
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
