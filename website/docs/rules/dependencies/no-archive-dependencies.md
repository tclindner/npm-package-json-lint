---
id: no-archive-dependencies
title: no-archive-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is url to archive file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-archive-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-archive-dependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.tar.gz"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.zip"
  }
}
```


### *Correct* examples

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-archive-dependencies": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.3.0
* Introduced in version 4.3.0
