const {NpmPackageJsonLint} = require('npm-package-json-lint');

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          rules: {
            type: 'object',
            additionalProperties: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      Program(node) {
        const linter = new NpmPackageJsonLint({
          packageJsonObject: JSON.parse(context.parserServices.getPackageJson()),
          packageJsonFilePath: context.parserServices.getPath(),
          config: context.options[0],
        });
        const results = linter.lint();

        if (results.results.length > 0) {
          results.results[0].issues.forEach(({lintMessage, lintId}) => {
            context.report({
              node,
              message: `(${lintId}) ${lintMessage}`,
            });
          });
        }
      },
    };
  },
};
