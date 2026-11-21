---
id: no-absolute-version-devDependencies
title: no-absolute-version-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` uses absolute versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-absolute-version-devDependencies": ["error", {
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

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

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

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-devDependencies": "off"
  }
}
```

## History

* Now reports an error when any devDependency uses an exact (absolute) version, not only when all of them do; dist-tags, ranges, npm aliases and local specs are not treated as absolute in version 11.0.2
* Improved messaging when an invalid configuration is detected in version 6.3.0
* Introduced in version 3.2.0
