---
id: require-keywords
title: require-keywords
---

Enabling this rule will result in a warning being generated if `keywords` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-keywords": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{

}
```

### *Correct* example(s)

```json
{
  "keywords": ["linter", "package"]
}
```

## History

* Renamed from keywords-recommended to require-keywords in version 1.0.0
* Introduced in version 0.1.0
