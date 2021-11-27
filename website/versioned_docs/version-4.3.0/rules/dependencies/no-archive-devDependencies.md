---
id: version-4.3.0-no-archive-devDependencies
title: no-archive-devDependencies
original_id: no-archive-devDependencies
---

Enabling this rule will result in an error being generated if one of the devDependencies in `devDependencies` is url to archive file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-archive-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-archive-devDependencies": ["error", {
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
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.tar.gz"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.zip"
  }
}
```

### *Correct* examples

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

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
    "no-archive-devDependencies": "off"
  }
}
```

## History

* Introduced in version 4.3.0
