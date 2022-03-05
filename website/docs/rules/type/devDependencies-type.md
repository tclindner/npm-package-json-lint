---
id: devDependencies-type
title: devDependencies-type
---

Enabling this rule will result in an error being generated if the value in `devDependencies` is not an object.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "devDependencies-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": 1
}
```

```json
{
  "devDependencies": ["npm-package-json-lint"]
}
```

```json
{
  "devDependencies": "npm-package-json-lint"
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

## History

* Introduced in version 0.1.0
