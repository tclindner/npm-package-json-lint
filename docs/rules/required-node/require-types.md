---
id: require-types
title: require-types
---

Enabling this rule will result in an error being generated if `types` is missing from the package.json file.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "require-types": "error"
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
  "types": "./lib/main.d.ts"
}
```

## Related

[require-typings](rules/required-node/require-typings.md)

## Notes

See <https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html> for more details.

## History

* Introduced in version 3.7.0
