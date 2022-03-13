module.exports = {
  extends: ['eslint-config-tc', 'eslint-config-typescript-tc'],
  rules: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'no-prototype-builtins': 'off',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'unicorn/filename-case': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.test.ts', 'test/fixtures/**'],
      rules: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
