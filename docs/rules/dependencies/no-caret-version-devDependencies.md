---
id: no-caret-version-devDependencies
title: no-caret-version-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` uses caret versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-caret-version-devDependencies": ["error", {
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
    "gulp-npm-package-json-lint": "^0.3.0"
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

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": ">=0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "<=0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "=0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-devDependencies": "off"
  }
}
```

## History

* Introduced in version 3.2.0
