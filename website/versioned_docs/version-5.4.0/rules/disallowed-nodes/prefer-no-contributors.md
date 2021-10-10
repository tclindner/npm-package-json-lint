---
id: version-5.4.0-prefer-no-contributors
title: prefer-no-contributors
original_id: prefer-no-contributors
---

Enabling this rule will result in an error being generated if `contributors` is present.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "prefer-no-contributors": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "contributors": [
    {
      "name": "Thomas Lindner",
      "email": "thomas.lindner@example.com"
    }
  ]
}
```

```json
{
  "contributors": [
    {
      "author": "Thomas Lindner <thomas.lindner@example.com>"
    }
  ]
}
```

### *Correct* example(s)

```json
{

}
```

## History

* Introduced in version 5.3.0
