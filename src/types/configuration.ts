/**
Severity of a rule in a configuration file.
*/
export type RuleSeverity = 'error' | 'warning' | 'off';

/**
Configuration of a single rule.

- Standard rules take a severity, e.g. `'error'`.
- Array rules take a severity and a list of values, e.g. `['error', ['MIT', 'ISC']]`.
- Object rules take a severity and an options object, e.g. `['error', {requireEndingPeriod: true}]`.
- Optional object rules take either form, e.g. `'error'` or `['error', {exceptions: ['my-module']}]`.
*/
export type RuleConfig = RuleSeverity | [RuleSeverity, unknown[]] | [RuleSeverity, Record<string, unknown>];

/**
Rules to apply, keyed by rule name.
*/
export type RulesConfig = Record<string, RuleConfig>;

/**
Rules that apply only to package.json files matching `patterns`.
*/
export interface ConfigurationOverride {
  /**
  Glob patterns, relative to the current working directory, of the package.json files the rules apply to.
  */
  patterns: string[];
  /**
  Rules to apply to the matching files.
  */
  rules: RulesConfig;
}

/**
npm-package-json-lint configuration, as written in `.npmpackagejsonlintrc.json`,
`npmpackagejsonlint.config.js`, or the `npmpackagejsonlint` property of package.json.

In a JavaScript config file, add `// @ts-check`, put the JSDoc tag
`@type {import('npm-package-json-lint').Configuration}` on a `const`, and export that `const`.
TypeScript doesn't check the tag when it's placed directly on `module.exports`.

@example
```ts
import type {Configuration} from 'npm-package-json-lint';

const config: Configuration = {
  rules: {
    'require-author': 'error',
  },
};
```
*/
export interface Configuration {
  /**
  Shareable configs to extend, e.g. `'npm-package-json-lint:default'`, a module name, or a file path.
  */
  extends?: string | string[];
  /**
  Allowed by the configuration schema. It doesn't change how configuration files are found.
  */
  root?: boolean;
  /**
  Rules to apply, keyed by rule name.
  */
  rules?: RulesConfig;
  /**
  Rules that apply only to some package.json files, e.g. in a monorepo.
  */
  overrides?: ConfigurationOverride[];
}
