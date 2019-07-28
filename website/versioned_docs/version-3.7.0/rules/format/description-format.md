---
id: version-3.7.0-description-format
title: description-format
original_id: description-format
---

Enabling this rule will result in an error being generated if `description` doesn't meet the configured options. Two options exist:

1. `requireCapitalFirstLetter` - Throws an error if the first character in the description isn't capitalized.
2. `requireEndingPeriod` - Throws an error if the description doesn't end with a period.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "description-format": ["error", {
      "requireCapitalFirstLetter": true,
      "requireEndingPeriod": true
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "description": "i'm a valid description."
}
```

```json
{
  "description": "I'm a valid description"
}
```

### *Correct* example(s)

```json
{
  "description": "I'm a valid description."
}
```

## Example .npmpackagejsonlintrc configuration with only `requireCapitalFirstLetter`

```json
{
  "rules": {
    "description-format": ["error", {
      "requireCapitalFirstLetter": true
    }]
  }
}
```

```json
{
  "rules": {
    "description-format": ["error", {
      "requireCapitalFirstLetter": true,
      "requireEndingPeriod": false
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "description": "i'm a valid description."
}
```

### *Correct* example(s)

```json
{
  "description": "I'm a valid description."
}
```

```json
{
  "description": "I'm a valid description"
}
```

## Example .npmpackagejsonlintrc configuration with only `requireEndingPeriod`

```json
{
  "rules": {
    "description-format": ["error", {
      "requireEndingPeriod": true
    }]
  }
}
```

```json
{
  "rules": {
    "description-format": ["error", {
      "requireCapitalFirstLetter": false,
      "requireEndingPeriod": true
    }]
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "description": "I'm a valid description"
}
```

### *Correct* example(s)

```json
{
  "description": "I'm a valid description."
}
```

```json
{
  "description": "i'm a valid description."
}
```

## History

* Introduced in version 3.3.0
