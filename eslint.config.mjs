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
];
