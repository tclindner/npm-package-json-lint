---
id: no-file-dependencies
title: no-file-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is url to local file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-file-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-file-dependencies": ["error", {
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
    "my-module": "file:local-module"
  }
}
```


### *Correct* examples


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
    "no-file-dependencies": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.2.0
* Introduced in version 4.3.0
