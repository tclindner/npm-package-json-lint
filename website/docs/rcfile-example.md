---
id: rcfile-example
title: .npmpackagejsonlintrc.json example
---

> Note: this is valid for v2.x.x+. Please see [migrating-from-v1-to-v2](v1-to-v2.md)

```json
{
  "rules": {
    "require-author": "error",
    "require-description": "error",
    "require-engines": "error",
    "require-license": "error",
    "require-name": "error",
    "require-repository": "error",
    "require-version": "error",
    "require-bugs": "error",
    "require-homepage": "error",
    "require-keywords": "error",
    "bin-type": "error",
    "config-type": "error",
    "description-type": "error",
    "devDependencies-type": "error",
    "directories-type": "error",
    "engines-type": "error",
    "files-type": "error",
    "homepage-type": "error",
    "keywords-type": "error",
    "license-type": "error",
    "main-type": "error",
    "man-type": "error",
    "name-type": "error",
    "preferGlobal-type": "error",
    "private-type": "error",
    "repository-type": "error",
    "scripts-type": "error",
    "version-type": "error",
    "valid-values-author": ["error", [
      "Thomas Lindner"
    ]],
    "valid-values-private": ["error", [
      false
    ]],
    "no-restricted-dependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-pre-release-dependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-devDependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "no-restricted-pre-release-devDependencies": ["error", [
      "gulping-npm-package-json-lint"
    ]],
    "name-format": "error",
    "version-format": "error"
  }
}
```

> Note: this is valid for v1.x.x. Please see [migrating-from-v0-to-v1](v0-to-v1.md)

```json
{
  "require-author": "error",
  "require-description": "error",
  "require-engines": "error",
  "require-license": "error",
  "require-name": "error",
  "require-repository": "error",
  "require-version": "error",
  "require-bugs": "error",
  "require-homepage": "error",
  "require-keywords": "error",
  "bin-type": "error",
  "config-type": "error",
  "description-type": "error",
  "devDependencies-type": "error",
  "directories-type": "error",
  "engines-type": "error",
  "files-type": "error",
  "homepage-type": "error",
  "keywords-type": "error",
  "license-type": "error",
  "main-type": "error",
  "man-type": "error",
  "name-type": "error",
  "preferGlobal-type": "error",
  "private-type": "error",
  "repository-type": "error",
  "scripts-type": "error",
  "version-type": "error",
  "valid-values-author": ["error", [
    "Thomas Lindner"
  ]],
  "valid-values-private": ["error", [
    false
  ]],
  "no-restricted-dependencies": ["error", [
    "gulping-npm-package-json-lint"
  ]],
  "no-restricted-pre-release-dependencies": ["error", [
    "gulping-npm-package-json-lint"
  ]],
  "no-restricted-devDependencies": ["error", [
    "gulping-npm-package-json-lint"
  ]],
  "no-restricted-pre-release-devDependencies": ["error", [
    "gulping-npm-package-json-lint"
  ]],
  "name-format": "error",
  "version-format": "error"
}
```
