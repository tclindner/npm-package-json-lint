---
id: no-restricted-dependencies
title: no-restricted-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` is equal to one of the values in the array of restricted dependencies.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-dependencies": ["error", [
      "grunt-npm-package-json-lint",
      "@types/*"
    ]]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "dependencies": {
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
  "dependencies": {
    "gulp-npm-package-json-lint": "^0.3.0"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-restricted-dependencies": "off"
  }
}
```

## History

* Allow for wildcard dependency restrictions. Add `*` to the end of the description string to indicate a wildcard search. This will result in a lint issue if the dependency starts with the string before the `*`. Added in 4.2.0.
* Renamed from dependencies-invalid-dependencies to no-restricted-dependencies in version 1.0.0
* Introduced in version 0.1.0
