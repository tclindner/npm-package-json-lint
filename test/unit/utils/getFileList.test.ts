import path from 'path';
import getFileList from '../../../src/utils/getFileList';
import {Severity} from '../../../src/types/severity';

describe('getFileList Unit Tests', () => {
  test('a config object should returned with all rules', () => {
    const patterns = ['', '.', '**', '**/package.json'];
    const cwd = path.join(__dirname, '../../fixtures');

    const results = getFileList(patterns, cwd);

    expect(results[0]).toContain('/test/fixtures/configJavaScriptFile/package.json');
    expect(results[1]).toContain('/test/fixtures/errors/package.json');
    expect(results[2]).toContain('/test/fixtures/errorsAndWarnings/package.json');
    expect(results[3]).toContain('/test/fixtures/hierarchyWithoutRoot/package.json');
    expect(results[4]).toContain('/test/fixtures/ignorePath/package.json');
    expect(results[5]).toContain('/test/fixtures/invalidConfig/package.json');
    expect(results[6]).toContain('/test/fixtures/monorepo/package.json');
    expect(results[7]).toContain('/test/fixtures/npmPackageJsonLintIgnore/package.json');
    expect(results[8]).toContain('/test/fixtures/overrides/package.json');
    expect(results[9]).toContain('/test/fixtures/packageJsonProperty/package.json');
    expect(results[10]).toContain('/test/fixtures/valid/package.json');
    expect(results[11]).toContain('/test/fixtures/warnings/package.json');
    expect(results[12]).toContain('/test/fixtures/hierarchyWithoutRoot/subdirectory/package.json');
    expect(results[13]).toContain('/test/fixtures/ignorePath/ignoredDirectory/package.json');
    expect(results[14]).toContain('/test/fixtures/npmPackageJsonLintIgnore/ignoredDirectory/package.json');
  });
});
