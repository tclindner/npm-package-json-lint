---
id: no-tilde-version-dependencies
title: no-tilde-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` uses tilde versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-tilde-version-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-tilde-version-dependencies": ["error", {
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
    "gulp-npm-package-json-lint": "~0.3.0"
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
    "no-tilde-version-dependencies": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.3.0
* Introduced in version 3.2.0
