---
id: version-3.7.0-scripts-type
title: scripts-type
original_id: scripts-type
---

Enabling this rule will result in an error being generated if the value in `scripts` is not an object or any of the individual scripts aren't strings.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "scripts-type": "error"
  }
}
```

## Rule Details

### *Incorrect* example(s)

```json
{
  "scripts": 1
}
```

```json
{
  "scripts": ["install", "bower install"]
}
```

```json
{
  "scripts": "install: bower install"
}
```

```json
{
  "scripts": {
    "myscript": false
  }
}
```

```json
{
  "scripts": {
    "myscript": {
      "start": "node index.js"
    }
  }
}
```

### *Correct* example(s)

```json
{
  "scripts": {
    "install": "bower install"
  }
}
```

## History

* Enhanced to validate that individual scripts are strings in version 3.0.0
* Introduced in version 0.1.0
