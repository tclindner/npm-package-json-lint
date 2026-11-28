import path from 'node:path';
import type {Configuration, ConfigurationOverride, RuleConfig} from '../../../src/api';
import {NpmPackageJsonLint} from '../../../src/npm-package-json-lint';

// ts-jest type-checks this file, so the `@ts-expect-error` lines fail the run if the type stops catching them.
describe('Configuration type', () => {
  const override: ConfigurationOverride = {
    patterns: ['packages/*'],
    rules: {
      'require-author': 'off',
    },
  };

  const config: Configuration = {
    extends: 'npm-package-json-lint:default',
    root: true,
    rules: {
      // standard rule
      'require-author': 'error',
      // array rules
      'valid-values-license': ['error', ['MIT', 'ISC']],
      'no-restricted-dependencies': ['warning', ['gulp', {name: 'grunt', replacement: 'npm scripts'}]],
      // object rule
      'description-format': ['error', {requireCapitalFirstLetter: true, requireEndingPeriod: true}],
      // optional object rule, both forms
      'prefer-absolute-version-dependencies': 'error',
      'prefer-caret-version-devDependencies': ['error', {exceptions: ['typescript']}],
    },
    overrides: [override],
  };

  test('a config using every rule form is accepted at runtime', () => {
    const linter = new NpmPackageJsonLint({
      cwd: process.cwd(),
      packageJsonObject: {name: 'my-module', version: '1.0.0'},
      packageJsonFilePath: path.join(process.cwd(), 'package.json'),
      config,
    });

    const {results} = linter.lint();
    const lintIds = results[0].issues.map((issue) => issue.lintId);

    expect(lintIds).toContain('require-author');
  });

  test('extends accepts a list', () => {
    const extendsList: Configuration = {extends: ['npm-package-json-lint:default', './my-config.json']};

    expect(extendsList.extends).toHaveLength(2);
  });

  test('invalid configs are rejected by the type', () => {
    // @ts-expect-error severity must be error, warning, or off
    const badSeverity: RuleConfig = 'fatal';
    // @ts-expect-error array and object rules take a severity first
    const missingSeverity: RuleConfig = [['MIT']];
    // @ts-expect-error unknown top-level properties are not allowed
    const unknownProperty: Configuration = {plugins: []};
    // @ts-expect-error overrides need patterns
    const overrideWithoutPatterns: ConfigurationOverride = {rules: {}};

    expect([badSeverity, missingSeverity, unknownProperty, overrideWithoutPatterns]).toHaveLength(4);
  });
});
