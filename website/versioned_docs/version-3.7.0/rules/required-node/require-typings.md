---
id: version-3.7.0-require-typings
title: require-typings
original_id: require-typings
---

Enabling this rule will result in an error being generated if `typings` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-typings": "error"
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
  "typings": "./lib/main.d.ts"
}
```

## Related

[require-types](rules/required-node/require-typings.md)

## Notes

See https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html for more details.

## History

* Introduced in version 3.7.0
