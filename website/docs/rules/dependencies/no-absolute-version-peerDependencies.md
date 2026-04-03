---
id: no-absolute-version-peerDependencies
title: no-absolute-version-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` uses absolute versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-absolute-version-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "=0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "~0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "npm-package-json-lint": ">=0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "<=0.3.0"
  }
}
```

```json
{
  "peerDependencies": {
    "npm-package-json-lint": "*"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-absolute-version-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
