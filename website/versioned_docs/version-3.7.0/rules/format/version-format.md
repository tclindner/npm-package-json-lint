---
id: version-3.7.0-version-format
title: version-format
original_id: version-format
---

Enabling this rule will result in an error being generated if `version` is not a valid [semantic version](http://semver.org/).

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "version-format": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "version": 1.0
}
```

```json
{
  "version": "1.a.0"
}
```

### *Correct* example(s)

```json
{
  "version": "1.0.0"
}
```

## Resources

* [semver](http://semver.org/)
* [node-semver](https://github.com/npm/node-semver)

## History

* Introduced in version 1.0.0
