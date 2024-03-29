---
id: valid-values-name-scope
title: valid-values-name-scope
---

Enabling this rule will result in an error being generated if the package `name` does not have a scope set to one of the values in the array of valid values.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-name-scope": ["error", [
      "@lerna",
      "@babel"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "name": "@awesome/my-program"
}
```

```json
{
  "name": "my-program"
}
```

### *Correct* example(s)

```json
{
  "name": "@lerna/my-program"
}
```

```json
{
  "name": "@babel/my-program"
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "valid-values-name-scope": "off"
  }
}
```

## History

* Improved messaging when an invalid configuration is detected in version 6.1.0
* Introduced in version 3.4.0
