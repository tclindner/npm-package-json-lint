---
id: no-git-dependencies
title: no-git-dependencies
---

Enabling this rule will result in an error being generated if one of the dependencies in `dependencies` uses git repository.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-dependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-git-dependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "github:miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#miri/issue-42"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#v1.0.0-rc-1"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#4f9012b132aa4d2d6097b516b31327c999b0a846"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "git://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "git@github.com:miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "git+https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "git+ssh://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "http://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "dependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

### *Correct* example(s)

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "^4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "~4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": ">=4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "<=4.0.0"
  }
}
```

```json
{
  "dependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-dependencies": "off"
  }
}
```

## History

* Introduced in version 4.3.0
