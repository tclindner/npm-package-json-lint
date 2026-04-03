---
id: no-caret-version-peerDependencies
title: no-caret-version-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` uses caret versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-caret-version-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "~0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": ">=0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "<=0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "=0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-caret-version-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
