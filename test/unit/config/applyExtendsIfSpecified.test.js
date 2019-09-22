const applyExtendsIfSpecified = require('../../../src/config/applyExtendsIfSpecified');

describe('applyExtendsIfSpecified Unit Tests', () => {
  test('when file has local extends (valid - js), a config object is returned', () => {
    const expectedConfigObj = {
      extends: './test/fixtures/extendsLocal/npmpackagejsonlint.config.js',
      rules: {
        'require-author': 'error',
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
    const passedConfig = {
      extends: './test/fixtures/extendsLocal/npmpackagejsonlint.config.js',
      rules: {
        'require-author': 'error'
      }
    };

    const filePath = './test/fixtures/extendsLocal/package.json';
    const result = applyExtendsIfSpecified(passedConfig, filePath);

    expect(result).toStrictEqual(expectedConfigObj);
  });

  test('when file has local extends (valid - json), a config object is returned', () => {
    const expectedConfigObj = {
      extends: './test/fixtures/extendsLocal/.npmpackagejsonlintrc.json',
      rules: {
        'require-author': 'error',
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
    const passedConfig = {
      extends: './test/fixtures/extendsLocal/.npmpackagejsonlintrc.json',
      rules: {
        'require-author': 'error'
      }
    };

    const filePath = './test/fixtures/extendsLocal/package.json';
    const result = applyExtendsIfSpecified(passedConfig, filePath);

    expect(result).toStrictEqual(expectedConfigObj);
  });

  test('when file has local extends (invalid), a config object is returned', () => {
    const passedConfig = {
      extends: './npmpackagejsonlint.config.js',
      rules: {
        'require-author': 'error'
      }
    };
    const filePath = './test/fixtures/extendsLocalInvalid/package.json';

    expect(() => {
      applyExtendsIfSpecified(passedConfig, filePath);
    }).toThrow();
  });

  test('when file has local extends (invalid extension type), a config object is returned', () => {
    const passedConfig = {
      extends: './npmpackagejsonlintrc.md',
      rules: {
        'require-author': 'error'
      }
    };
    const filePath = './test/fixtures/extendsLocalInvalid/package.json';

    expect(() => {
      applyExtendsIfSpecified(passedConfig, filePath);
    }).toThrow();
  });

  test('when file has module extends (valid), a config object is returned', () => {
    const expectedConfigObj = {
      extends: 'npm-package-json-lint-config-default',
      rules: {
        'bin-type': 'error',
        'config-type': 'error',
        'cpu-type': 'error',
        'dependencies-type': 'error',
        'description-type': 'error',
        'devDependencies-type': 'error',
        'directories-type': 'error',
        'engines-type': 'error',
        'files-type': 'error',
        'homepage-type': 'error',
        'keywords-type': 'error',
        'license-type': 'error',
        'main-type': 'error',
        'man-type': 'error',
        'name-format': 'error',
        'name-type': 'error',
        'optionalDependencies-type': 'error',
        'os-type': 'error',
        'peerDependencies-type': 'error',
        'preferGlobal-type': 'error',
        'private-type': 'error',
        'repository-type': 'error',
        'require-author': 'error',
        'require-name': 'error',
        'require-version': 'error',
        'scripts-type': 'error',
        'version-format': 'error',
        'version-type': 'error'
      }
    };
    const passedConfig = {
      extends: 'npm-package-json-lint-config-default',
      rules: {
        'require-author': 'error'
      }
    };
    const filePath = './test/fixtures/extendsModule/package.json';
    const result = applyExtendsIfSpecified(passedConfig, filePath);

    expect(result).toStrictEqual(expectedConfigObj);
  });

  test('when file module extends (invalid), a config object is returned', () => {
    const filePath = './test/fixtures/extendsModuleInvalid/package.json';

    const passedConfig = {
      extends: 'npm-package-json-lint-config-awesome-module',
      rules: {
        'require-author': 'error'
      }
    };

    expect(() => {
      applyExtendsIfSpecified(passedConfig, filePath);
    }).toThrow();
  });
});
