---
id: no-absolute-version-dependencies
title: no-absolute-version-dependencies
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

With exceptions

```json
{
  "rules": {
    "no-absolute-version-dependencies": ["error", {
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

* Now reports an error when any dependency uses an exact (absolute) version, not only when all of them do; dist-tags, ranges, npm aliases and local specs are not treated as absolute in version 11.0.2
* Improved messaging when an invalid configuration is detected in version 6.3.0
* Introduced in version 3.2.0
