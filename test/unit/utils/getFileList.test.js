const path = require('path');
const getFileList = require('../../../src/utils/getFileList');

describe('getFileList Unit Tests', () => {
  test('a config object should returned with all rules', () => {
    const patterns = ['', '.', '**', '**/package.json'];
    const cwd = path.join(__dirname, '/../../../fixtures');

    const results = getFileList(patterns, cwd);

    expect(results[0]).toContain('npm-package-json-lint/fixtures/package.json');
    expect(results[1]).toContain('npm-package-json-lint/fixtures/test/fixtures/configJavaScriptFile/package.json');
    expect(results[2]).toContain('npm-package-json-lint/fixtures/test/fixtures/errors/package.json');
    expect(results[3]).toContain('npm-package-json-lint/fixtures/test/fixtures/errorsAndWarnings/package.json');
    expect(results[4]).toContain('npm-package-json-lint/fixtures/test/fixtures/hierarchyWithoutRoot/package.json');
    expect(results[5]).toContain('npm-package-json-lint/fixtures/test/fixtures/ignorePath/package.json');
    expect(results[6]).toContain('npm-package-json-lint/fixtures/test/fixtures/invalidConfig/package.json');
    expect(results[7]).toContain('npm-package-json-lint/fixtures/test/fixtures/npmPackageJsonLintIgnore/package.json');
    expect(results[8]).toContain('npm-package-json-lint/fixtures/test/fixtures/packageJsonProperty/package.json');
    expect(results[9]).toContain('npm-package-json-lint/fixtures/test/fixtures/valid/package.json');
    expect(results[10]).toContain('npm-package-json-lint/fixtures/test/fixtures/warnings/package.json');
    expect(results[11]).toContain(
      'npm-package-json-lint/fixtures/test/fixtures/hierarchyWithoutRoot/subdirectory/package.json'
    );
    expect(results[12]).toContain('npm-package-json-lint/fixtures/test/fixtures/ignorePath/ignoredDirectory/package.json');
    expect(results[13]).toContain(
      'npm-package-json-lint/fixtures/test/fixtures/npmPackageJsonLintIgnore/ignoredDirectory/package.json'
    );
  });
});
