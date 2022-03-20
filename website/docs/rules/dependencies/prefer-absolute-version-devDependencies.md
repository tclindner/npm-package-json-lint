---
id: prefer-absolute-version-devDependencies
title: prefer-absolute-version-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` is does not use an absolute version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-absolute-version-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-absolute-version-devDependencies": ["error", {
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
    "grunt-npm-package-json-lint": "~0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "0.3.*"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": ">0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "<0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "=0.3.0"
  }
}
```

## Related

* [prefer-caret-version-devDependencies](prefer-caret-version-devDependencies.md)
* [prefer-tilde-version-devDependencies](prefer-tilde-version-devDependencies.md)

## History

* Improved messaging when an invalid configuration is detected in version 6.3.0
* Enhanced in version 2.5.0. No longer requires the version to be prefixed with an equals sign, =
* Introduced in version 2.4.0
