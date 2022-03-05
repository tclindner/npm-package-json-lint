---
id: no-caret-version-dependencies
title: no-caret-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` uses caret versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-caret-version-dependencies": ["error", {
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
    "gulp-npm-package-json-lint": "^0.3.0"
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

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-dependencies": "off"
  }
}
```

## History

* Introduced in version 3.2.0
