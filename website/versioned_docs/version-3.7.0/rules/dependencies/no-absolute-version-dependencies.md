---
id: version-3.7.0-no-absolute-version-dependencies
title: no-absolute-version-dependencies
original_id: no-absolute-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` uses absolute versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-dependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "=0.3.0"
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

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "~0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": ">=0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "<=0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-dependencies": "off"
  }
}
```

## History

* Introduced in version 3.2.0
