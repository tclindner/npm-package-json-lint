---
id: no-file-peerDependencies
title: no-file-peerDependencies
---

Enabling this rule will result in an error being generated if one of the peerDependencies in `peerDependencies` is url to local file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-file-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-file-peerDependencies": ["error", {
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
    "my-module": "file:local-module"
  }
}
```


### *Correct* examples


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
    "no-file-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
