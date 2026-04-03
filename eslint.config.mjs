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
    },
  },
  {
    files: ['test/**/*.test.ts', 'test/fixtures/**'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
