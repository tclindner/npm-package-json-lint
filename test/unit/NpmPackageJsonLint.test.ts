import {NpmPackageJsonLint} from '../../src/npm-package-json-lint';

describe('NpmPackageJsonLint Unit Tests', () => {
  describe('lint method', () => {
    describe('validate that errors and warnings are set', () => {
      test('two errors and zero warnings expected', () => {
        const npmPackageJsonLint = new NpmPackageJsonLint({
          cwd: process.cwd(),
          patterns: ['./package.json'],
        });
        const response = npmPackageJsonLint.lint();

        const expectedResults = 1;
        const expectedTotalIgnoreCount = 0;
        const expectedTotalErrorCount = 0;
        const expectedTotalWarningCount = 1;
        const expectedIssues = 1;

        expect(response.results).toHaveLength(expectedResults);
        expect(response.ignoreCount).toStrictEqual(expectedTotalIgnoreCount);
        expect(response.errorCount).toStrictEqual(expectedTotalErrorCount);
        expect(response.warningCount).toStrictEqual(expectedTotalWarningCount);
        expect(response.results[0].issues).toHaveLength(expectedIssues);
      });
    });

    describe('validate that errors and warnings are set on output', () => {
      test('ten errors and one warning expected', () => {
        const packageJsonData = {
          name: 'ALLCAPS',
        };
        const npmPackageJsonLint = new NpmPackageJsonLint({
          packageJsonObject: packageJsonData,
          packageJsonFilePath: './test/fixtures/errorsAndWarnings/package.json',
        });
        const response = npmPackageJsonLint.lint();

        const expectedResults = 1;
        const expectedTotalIgnoreCount = 0;
        const expectedTotalErrorCount = 9;
        const expectedTotalWarningCount = 1;
        const expectedIssues = 10;
        const expectedErrorCount = 9;
        const expectedWarningCount = 1;

        expect(response.results).toHaveLength(expectedResults);
        expect(response.ignoreCount).toStrictEqual(expectedTotalIgnoreCount);
        expect(response.errorCount).toStrictEqual(expectedTotalErrorCount);
        expect(response.warningCount).toStrictEqual(expectedTotalWarningCount);
        expect(response.results[0].issues).toHaveLength(expectedIssues);
        expect(response.results[0].issues.filter((issue) => issue.severity === 'error')).toHaveLength(expectedErrorCount);
        expect(response.results[0].issues.filter((issue) => issue.severity === 'warning')).toHaveLength(
          expectedWarningCount
        );
      });
    });

    describe('when patterns is passed as a string', () => {
      test('an error is thrown', () => {
        const npmPackageJsonLint = new NpmPackageJsonLint({
          cwd: process.cwd(),
          patterns: './package.json',
        });
        expect(() => {
          npmPackageJsonLint.lint();
        }).toThrow('Patterns must be an array.');
      });
    });

    describe('when patterns and packageJsonObject are passed', () => {
      test('an error is thrown', () => {
        const npmPackageJsonLint = new NpmPackageJsonLint({
          cwd: process.cwd(),
          packageJsonObject: {},
          patterns: './package.json',
        });
        expect(() => {
          npmPackageJsonLint.lint();
        }).toThrow(
          'You must pass npm-package-json-lint a `patterns` glob or a `packageJsonObject` string, though not both.'
        );
      });
    });

    describe('validate that when quiet is set', () => {
      test('warnings are suppressed', () => {
        const packageJsonData = {
          name: 'ALLCAPS',
        };
        const npmPackageJsonLint = new NpmPackageJsonLint({
          cwd: process.cwd(),
          packageJsonObject: packageJsonData,
          packageJsonFilePath: './test/fixtures/errorsAndWarnings/package.json',
          quiet: true,
        });
        const response = npmPackageJsonLint.lint();

        const expectedResults = 1;
        const expectedTotalIgnoreCount = 0;
        const expectedTotalErrorCount = 9;
        const expectedTotalWarningCount = 1;
        const expectedIssues = 9;
        const expectedErrorCount = 9;
        const expectedWarningCount = 0;

        expect(response.results).toHaveLength(expectedResults);
        expect(response.ignoreCount).toStrictEqual(expectedTotalIgnoreCount);
        expect(response.errorCount).toStrictEqual(expectedTotalErrorCount);
        expect(response.warningCount).toStrictEqual(expectedTotalWarningCount);
        expect(response.results[0].issues).toHaveLength(expectedIssues);
        expect(response.results[0].issues.filter((issue) => issue.severity === 'error')).toHaveLength(expectedErrorCount);
        expect(response.results[0].issues.filter((issue) => issue.severity === 'warning')).toHaveLength(
          expectedWarningCount
        );
      });
    });

    describe('validate that when quiet is set and no errors are found', () => {
      test('result is defaulted', () => {
        const packageJsonData = {
          name: 'npm-package-json-lint-valid',
          version: '0.1.0',
          description: 'CLI app for linting package.json files.',
          keywords: ['lint'],
          homepage: 'https://github.com/tclindner/npm-package-json-lint',
          author: 'Thomas Lindner',
          repository: {
            type: 'git',
            url: 'https://github.com/tclindner/npm-package-json-lint',
          },
          devDependencies: {
            mocha: '^2.4.5',
          },
        };
        const npmPackageJsonLint = new NpmPackageJsonLint({
          cwd: process.cwd(),
          packageJsonObject: packageJsonData,
          packageJsonFilePath: './test/fixtures/valid/package.json',
          quiet: true,
        });
        const response = npmPackageJsonLint.lint();

        const expectedResults = 0;
        const expectedTotalIgnoreCount = 0;
        const expectedTotalErrorCount = 0;
        const expectedTotalWarningCount = 0;

        expect(response.results).toHaveLength(expectedResults);
        expect(response.ignoreCount).toStrictEqual(expectedTotalIgnoreCount);
        expect(response.errorCount).toStrictEqual(expectedTotalErrorCount);
        expect(response.warningCount).toStrictEqual(expectedTotalWarningCount);
      });
    });
  });
});
