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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'no-prototype-builtins': 'off',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'unicorn/filename-case': 'off',
      // TODO: remove after esm migration
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['test/**/*.test.ts', 'test/fixtures/**'],
    rules: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '@typescript-eslint/naming-convention': 'off',
    },
  },
];
