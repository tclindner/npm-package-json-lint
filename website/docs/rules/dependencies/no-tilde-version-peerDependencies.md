---
id: no-tilde-version-peerDependencies
title: no-tilde-version-peerDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `peerDependencies` uses tilde versions.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-tilde-version-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-tilde-version-peerDependencies": ["error", {
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
    "npm-package-json-lint": "~0.3.0"
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

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-tilde-version-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
