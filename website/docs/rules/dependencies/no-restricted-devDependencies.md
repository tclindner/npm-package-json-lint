---
id: no-restricted-devDependencies
title: no-restricted-devDependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `devDependencies` is equal to one of the values in the array of restricted dependencies.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-devDependencies": ["error", [
      "grunt-npm-package-json-lint",
      "@types/*"
    ]]
  }
}
```

```json
{
  "rules": {
    "no-restricted-devDependencies": ["error", [
      {
        "name": "grunt-npm-package-json-lint",
        "replacement": "gulp-npm-package-json-lint"
      },
      {
        "name": "@types/*",
        "replacement": "@new-types/*"
      }
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "^0.3.0"
  }
}
```

```json
{
  "devDependencies": {
    "@types/node": "^0.3.0"
  }
}
```

### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-devDependencies": "off"
  }
}
```

## History

* Allow for configurable replacement packages in version 9.1.0
* Improved messaging when an invalid configuration is detected in version 6.3.0
* Allow for wildcard dependency restrictions. Add `*` to the end of the dependency string to indicate a wildcard search. This will result in a lint issue if the dependency starts with the string before the `*`. Added in 4.2.0.
* Renamed from devDependencies-invalid-dependencies to no-restricted-devDependencies in version 1.0.0
* Introduced in version 0.1.0
