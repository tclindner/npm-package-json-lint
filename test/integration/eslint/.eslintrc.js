module.exports = {
  root: true,
  overrides: [
    {
      plugins: ['package-json'],
      files: ['**/package.json'],
      parser: '../../../src/eslint/parser.js',
      rules: {
        'package-json/package-json': ['error', {
          rules: {
            'require-name': 'error',
            'require-version': 'error',
            'prefer-alphabetical-scripts': 'error',
          }
        }],
      },
    },
  ],
};
