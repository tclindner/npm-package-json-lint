---
id: no-git-peerDependencies
title: no-git-peerDependencies
---

Enabling this rule will result in an error being generated if one of the peerDependencies in `peerDependencies` uses git repository.

## Example .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-peerDependencies": "error"
  }
}
```

With exceptions

```json
{
  "rules": {
    "no-git-peerDependencies": ["error", {
      "exceptions": ["myModule"]
    }]
  }
}
```

## Rule Details

### *Incorrect* examples

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "github:miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#miri/issue-42"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#v1.0.0-rc-1"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "miripiruni/grunt-npm-package-json-lint#4f9012b132aa4d2d6097b516b31327c999b0a846"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "git://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "git@github.com:miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "git+https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "git+ssh://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```


```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "http://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```

```json
{
  "peerDependencies": {
    "grunt-npm-package-json-lint": "https://github.com/miripiruni/grunt-npm-package-json-lint.git"
  }
}
```



### *Correct* example(s)

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "^4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "~4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": ">=4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "<=4.0.0"
  }
}
```

```json
{
  "peerDependencies": {
    "gulp-npm-package-json-lint": "*"
  }
}
```

## Shorthand for disabling the rule in .npmpackagejsonlintrc configuration

```json
{
  "rules": {
    "no-git-peerDependencies": "off"
  }
}
```

## History

* Introduced in version 10.1.0
