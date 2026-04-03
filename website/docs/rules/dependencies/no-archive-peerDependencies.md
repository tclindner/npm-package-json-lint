---
id: no-archive-peerDependencies
title: no-archive-peerDependencies
---

Enabling this rule will result in an error being generated if one of the peerDependencies in `peerDependencies` is url to archive file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-archive-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-archive-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.tar.gz"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint/archive/v1.2.3.zip"
  }
}
```


### *Correct* examples

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-archive-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
