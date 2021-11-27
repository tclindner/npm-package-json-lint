---
id: version-4.2.0-no-repeated-dependencies
title: no-repeated-dependencies
original_id: no-repeated-dependencies
---

Enabling this rule will result in an error being generated if a dependency exists in both `dependencies` and `devDependencies`.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-repeated-dependencies": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  },
  "devDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  },
  "devDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

## History

* Introduced in version 4.2.0
