---
id: version-4.3.0-no-git-devDependencies
title: no-git-devDependencies
original_id: no-git-devDependencies
---

Enabling this rule will result in an error being generated if one of the devDependencies in `devDependencies` uses git repository.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-devDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-git-devDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "github:miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#miri/issue-42"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#v1.0.0-rc-1"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#4f9012b132aa4d2d6097b516b31327c999b0a846"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "git://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "git@github.com:miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "git+https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "git+ssh://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```


```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "http://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "devDependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```



### *Correct* example(s)

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "^4.0.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "~4.0.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": ">=4.0.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "<=4.0.0"
  }
}
```

```json
{
  "devDependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-devDependencies": "off"
  }
}
```

## History

* Introduced in version 4.3.0
