---
id: name-format
title: name-format
---

Enabling this rule will result in an error being generated if `name` does not meet the [naming constraints](https://github.com/npm/validate-npm-package-name#naming-rules).

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "name-format": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": "NPM-Package-JSON-Lint"
}
```

```json
{
  "name": "npm package json lint"
}
```

```json
{
  "name": ".npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "name": "npm-package-json-lint"
}
```

## History

* Augmented with all name checks in `validate-npm-package-name` in version 6.0.0
* Added checks for name length and not starting with . or _ in version 4.0.0
* Introduced in version 1.0.0
