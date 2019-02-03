'use strict';

const spawnSync = require('child_process').spawnSync;
const pkg = require('./../../package.json');
const figures = require('figures');

const relativePathToCli = './src/cli.js';

// Paths to config file and package.json fixtures
const fixturesPath = './tests/fixtures';
const validFixturesPath = `${fixturesPath}/valid`;
const validRcFile = `${validFixturesPath}/.npmpackagejsonlintrc.json`;
const validPkg = `${validFixturesPath}/package.json`;
const errorFixturesPath = `${fixturesPath}/errors`;
const errorPkg = `${errorFixturesPath}/package.json`;
const errorRcFile = `${errorFixturesPath}/.npmpackagejsonlintrc.json`;
const warningFixturesPath = `${fixturesPath}/warnings`;
const warningPkg = `${warningFixturesPath}/package.json`;
const warningRcFile = `${warningFixturesPath}/.npmpackagejsonlintrc.json`;
const errAndWarnsFixturesPath = `${fixturesPath}/errorsAndWarnings`;
const errorWarningPkg = `${errAndWarnsFixturesPath}/package.json`;
const errorWarningRcFile = `${errAndWarnsFixturesPath}/.npmpackagejsonlintrc.json`;
const configJsFileFixturesPath = `${fixturesPath}/configJavaScriptFile`;
const configJavaScriptFile = `${configJsFileFixturesPath}/npmpackagejsonlint.config.js`;
const configJavaScriptFilePkg = `${configJsFileFixturesPath}/package.json`;
const pkgJsonPropFixturePath = `${fixturesPath}/packageJsonProperty`;
const packageJsonPropertyPkg = `${pkgJsonPropFixturePath}/package.json`;
const invalidFixturesPath = `${fixturesPath}/invalidConfig`;
const invalidRcFile = `${invalidFixturesPath}/.npmpackagejsonlintrc.json`;
const invalidPkgJsonPropertyPkg = `${invalidFixturesPath}/package.json`;
const invalidConfigJsFile = `${invalidFixturesPath}/npmpackagejsonlint.config.json`;

// Exit codes
const zeroClean = 0;
const oneMissingTargets = 1;
const twoLintErrorsDetected = 2;
const threeRunTimeException = 3;

describe('cli Unit Tests', function() {
  describe('when the help command is run', function() {
    const expected = `
  Configurable linter for package.json files.

  Usage
    $ npmPkgJsonLint <patterns>

  Options
    --quiet, -q Report errors only
    --noConfigFiles, -ncf Disables use of .npmpackagejsonlintrc.json files, npmpackagejsonlint.config.js files, and npmPackageJsonLintConfig object in package.json file.
    --configFile, -c File path of .npmpackagejsonlintrc.json
    --ignorePath, -i Path to a file containing patterns that describe files to ignore. The path can be absolute or relative to process.cwd(). By default, npm-package-json-lint looks for .npmpackagejsonlintignore in process.cwd().

  Examples
    $ npmPkgJsonLint --version
    $ npmPkgJsonLint .
    $ npmPkgJsonLint ./packages
    $ npmPkgJsonLint ./package1 ./package2
    $ npmPkgJsonLint -c ./config/.npmpackagejsonlintrc.json .
    $ npmPkgJsonLint --configFile ./config/npmpackagejsonlint.config.json .
    $ npmPkgJsonLint -q .
    $ npmPkgJsonLint --quiet ./packages
    $ npmPkgJsonLint . --ignorePath .gitignore
    $ npmPkgJsonLint . -i .gitignore\n\n`;

    test('with --help, a list of commands is printed', function() {
      const cli = spawnSync(relativePathToCli, ['--help']);

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(zeroClean);
    });
  });

  describe('when the version command is run', function() {
    const expected = `${pkg.version}\n`;

    test('with --version, a list of commands is printed', function() {
      const cli = spawnSync(relativePathToCli, ['--version']);

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(zeroClean);
    });
  });

  // NOTE: also tests loading config and package.json files
  describe('when the cli is run without targets', function() {
    test('an except should be thrown that no lint targets were provided', function() {
      const cli = spawnSync(relativePathToCli);
      const expected = 'No lint targets provided\n';

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(oneMissingTargets);
    });
  });

  describe('when the cli is run without quiet', function() {
    test('and one error, zero warnings is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', errorRcFile, errorPkg]);
      const expected = `
${errorPkg}
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
0 warnings
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });

    test('and no errors, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, ['--configFile', warningRcFile, warningPkg]);
      const expected = `
${warningPkg}
${figures.warning} require-license - node: license - license is required
0 errors
1 warning
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(zeroClean);
    });

    test('and one error, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', errorWarningRcFile, errorWarningPkg]);
      const expected = `
${errorWarningPkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });
  });

  describe('when the cli is run and quiet is set', function() {
    test('and no errors, no warnings is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', validRcFile, '-q', validPkg]);
      const expected = '';

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(zeroClean);
    });

    test('and one error, zero warnings is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', errorRcFile, errorPkg, '-q']);
      const expected = `
${errorPkg}
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });

    test('and no errors, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, ['--configFile', warningRcFile, warningPkg, '--quiet']);
      const expected = '';

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.status).toStrictEqual(zeroClean);
    });

    test('and one error, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', errorWarningRcFile, errorWarningPkg, '--quiet']);
      const expected = `
${errorWarningPkg}
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });
  });

  describe('when the cli has the config as a package.json property', function() {
    test('and one error, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, [packageJsonPropertyPkg]);
      const expected = `
${packageJsonPropertyPkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });
  });

  describe('when the cli has the config as a JavaScript export', function() {
    test('and one error, one warning is expected', function() {
      const cli = spawnSync(relativePathToCli, ['-c', configJavaScriptFile, configJavaScriptFilePkg]);
      const expected = `
${configJavaScriptFilePkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });
  });

  describe('when the cli is run with invalid config', function() {
    test('invalid rcfile', function() {
      const cli = spawnSync(relativePathToCli, ['-c', invalidRcFile, validPkg]);

      expect(cli.status).toStrictEqual(threeRunTimeException);
    });

    test('invalid package.json config property', function() {
      const cli = spawnSync(relativePathToCli, [invalidPkgJsonPropertyPkg]);

      expect(cli.status).toStrictEqual(threeRunTimeException);
    });

    test('invalid JavaScript config file', function() {
      const cli = spawnSync(relativePathToCli, ['-c', invalidConfigJsFile, validPkg]);

      expect(cli.status).toStrictEqual(threeRunTimeException);
    });
  });

  describe('when the cli is run against all fixtures using pattern', function() {
    test('each file results and totals will be output', function() {
      const cli = spawnSync(relativePathToCli, [validFixturesPath, errorFixturesPath, warningFixturesPath, errAndWarnsFixturesPath, configJsFileFixturesPath, pkgJsonPropFixturePath]);
      const expected = `
${errorPkg}
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
0 warnings

${warningPkg}
${figures.warning} require-license - node: license - license is required
0 errors
1 warning

${errorWarningPkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning

${configJavaScriptFilePkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning

${packageJsonPropertyPkg}
${figures.warning} require-license - node: license - license is required
${figures.cross} require-scripts - node: scripts - scripts is required
1 error
1 warning

Totals
4 errors
4 warnings
`;

      expect(cli.stdout.toString()).toStrictEqual(expected);
      expect(cli.stderr.toString()).toStrictEqual('');
      expect(cli.status).toStrictEqual(twoLintErrorsDetected);
    });
  });
});
