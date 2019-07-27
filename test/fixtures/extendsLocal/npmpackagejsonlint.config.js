module.exports = {
  rules: {
    'require-author': 'warning',
    'require-description': 'error'
  },
  overrides: [
    {
      patterns: ['**/package.json'],
      rules: {
        'require-author': 'warning'
      }
    }
  ]
};
