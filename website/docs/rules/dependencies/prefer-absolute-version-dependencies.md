---
id: prefer-absolute-version-dependencies
title: prefer-absolute-version-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is does not use an absolute version range.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-absolute-version-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "prefer-absolute-version-dependencies": ["error", {
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
    "grunt-npm-package-json-lint": "~0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "0.3.*"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": ">0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "<0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "=0.3.0"
  }
}
```

## Related

* [prefer-caret-version-dependencies](prefer-caret-version-dependencies.md)
* [prefer-tilde-version-dependencies](prefer-tilde-version-dependencies.md)

## History

* Enhanced in version 2.5.0. No longer requires the version to be prefixed with an equals sign, =
* Introduced in version 2.4.0
