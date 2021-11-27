---
id: no-file-devDependencies
title: no-file-devDependencies
---

Enabling this rule will result in an error being generated if one of the devDependencies in `devDependencies` is url to local file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-file-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-file-devDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "devDependencies": {
    "my-module": "file:local-module"
  }
}
```

### *Correct* examples

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-file-devDependencies": "off"
  }
}
```

## History

* Introduced in version 4.3.0
