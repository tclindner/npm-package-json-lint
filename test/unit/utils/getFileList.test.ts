import path from 'node:path';
import {getFileList} from '../../../src/utils/getFileList';

describe('getFileList Unit Tests', () => {
  test('a config object should returned with all rules', () => {
    const patterns = ['', '.', '**', '**/package.json'];
    const cwd = path.join(__dirname, '../../fixtures');

    const results = getFileList(patterns, cwd);

    expect(results[0]).toContain('/test/fixtures/config-file-with-overrides/package.json');
    expect(results[1]).toContain('/test/fixtures/configJavaScriptFile/package.json');
    expect(results[2]).toContain('/test/fixtures/errors/package.json');
    expect(results[3]).toContain('/test/fixtures/errorsAndWarnings/package.json');
    expect(results[4]).toContain('/test/fixtures/extendsBuiltIn/package.json');
    expect(results[5]).toContain('/test/fixtures/hierarchyWithoutRoot/package.json');
    expect(results[6]).toContain('/test/fixtures/ignorePath/package.json');
    expect(results[7]).toContain('/test/fixtures/invalidConfig/package.json');
    expect(results[8]).toContain('/test/fixtures/monorepo/package.json');
    expect(results[9]).toContain('/test/fixtures/npmPackageJsonLintIgnore/package.json');
    expect(results[10]).toContain('/test/fixtures/overrides/package.json');
    expect(results[11]).toContain('/test/fixtures/packageJsonProperty/package.json');
    expect(results[12]).toContain('/test/fixtures/valid/package.json');
    expect(results[13]).toContain('/test/fixtures/warnings/package.json');
    expect(results[14]).toContain('/test/fixtures/hierarchyWithoutRoot/subdirectory/package.json');
    expect(results[15]).toContain('/test/fixtures/ignorePath/ignoredDirectory/package.json');
    expect(results[16]).toContain('/test/fixtures/npmPackageJsonLintIgnore/ignoredDirectory/package.json');
  });

  describe('when patterns point outside of cwd', () => {
    const monorepoPath = path.join(__dirname, '../../fixtures/monorepo');
    const cwd = path.join(monorepoPath, 'packages/packageOne');
    const packageOne = path.join(monorepoPath, 'packages/packageOne/package.json');
    const packageTwo = path.join(monorepoPath, 'packages/packageTwo/package.json');

    test('a ../ directory pattern returns the sibling package.json', () => {
      expect(getFileList(['../packageTwo'], cwd)).toStrictEqual([packageTwo]);
    });

    test('a ../ file pattern returns the sibling package.json', () => {
      expect(getFileList(['../packageTwo/package.json'], cwd)).toStrictEqual([packageTwo]);
    });

    test('a ../ glob pattern returns every matching package.json once', () => {
      expect(getFileList(['../*/package.json', '.'], cwd)).toStrictEqual([packageOne, packageTwo]);
    });

    test('an absolute pattern outside cwd returns the matching package.json', () => {
      expect(getFileList([path.join(monorepoPath, 'packages/packageTwo')], cwd)).toStrictEqual([packageTwo]);
    });

    test('a parent directory pattern returns the packages below it', () => {
      expect(getFileList(['..'], cwd)).toStrictEqual([packageOne, packageTwo]);
    });
  });
});
