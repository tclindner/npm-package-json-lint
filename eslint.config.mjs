import config from 'eslint-config-tc';
import tsconfig from 'eslint-config-typescript-tc';

export default [
  {
    ignores: ['website', 'coverage/', 'index.d.ts', 'dist/'],
  },
  ...config,
  ...tsconfig,
  {
    rules: {
      'no-prototype-builtins': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      // This rule's abbreviation dictionary doesn't fit this codebase's domain vocabulary -- e.g. it wants
      // `devDependencies` renamed to `developmentDependencies`, which is wrong since that's a literal npm
      // package.json field name, not a generic abbreviation to expand.
      'unicorn/name-replacements': 'off',
    },
  },
  {
    files: ['test/**/*.test.ts', 'test/fixtures/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
  {
    files: ['tsdown.config.ts'],
    rules: {
      // tsdown isn't in this rule's built-in list of known-pure config builders (unlike vite/vitest/rollup),
      // so calling its `defineConfig` at the top level of this config file is otherwise flagged.
      'unicorn/no-top-level-side-effects': ['error', {allow: {tsdown: ['defineConfig']}}],
    },
  },
];
