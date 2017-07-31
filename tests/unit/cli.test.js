'use strict';

const spawnSync = require('child_process').spawnSync;
const pkg = require('./../../package.json');

const validRcFile = './tests/fixtures/valid/.npmpackagejsonlintrc.json';
const errorPkg = './tests/fixtures/errors/package.json';
const errorRcFile = './tests/fixtures/errors/.npmpackagejsonlintrc.json';
const warningPkg = './tests/fixtures/warnings/package.json';
const warningRcFile = './tests/fixtures/warnings/.npmpackagejsonlintrc.json';
const errorWarningPkg = './tests/fixtures/errorsAndWarnings/package.json';
const errorWarningRcFile = './tests/fixtures/errorsAndWarnings/.npmpackagejsonlintrc.json';

describe('cli Unit Tests', function() {
  context('when the help command is run', function() {
    const expected = `
  Usage: cli npm-package-json-lint

  Options:

    -h, --help                           output usage information
    -V, --version                        output the version number
    -f, --file <filePath>                File path including name. Defaults to ./package.json
    -r, --rule <rule name>               Valid rule name to check. Defaults to nothing
    -s, --rule-severity <rule severity>  "error" or "warning". Defaults to error
    -c, --rules-file <filePath>          File path of .npmpackagejsonlintrc
    -q, --quiet                          Report errors only
    -w, --ignore-warnings                Ignore warnings

`;

    it('with -h, a list of commands is printed', function() {
      const cli = spawnSync('./src/cli.js', ['-h']);

      cli.stdout.toString().should.equal(expected);
    });

    it('with --help, a list of commands is printed', function() {
      const cli = spawnSync('./src/cli.js', ['--help']);

      cli.stdout.toString().should.equal(expected);
    });
  });

  context('when the version command is run', function() {
    const expected = `${pkg.version}
`;

    it('with --version, a list of commands is printed', function() {
      const cli = spawnSync('./src/cli.js', ['--version']);

      cli.stdout.toString().should.equal(expected);
    });
  });

  // NOTE: also tests loading config and package.json files
  context('when the cli is run without options', function() {
    it('and no errors, no warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', validRcFile]);
      const expected = `
No errors found!

No warnings found!
./package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorRcFile, '-f', errorPkg]);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and no errors, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['--rules-file', warningRcFile, '--file', warningPkg]);
      const expected = `
1 warning
require-license - node: license - license is required

./tests/fixtures/warnings/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorWarningRcFile, '-f', errorWarningPkg]);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

1 warning
require-license - node: license - license is required

1 warnings found.
./tests/fixtures/errorsAndWarnings/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });
  });

  context('when the cli is run with ignore-warnings set', function() {
    it('and no errors, no warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', validRcFile, '-w']);
      const expected = `
./package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorRcFile, '-f', errorPkg, '-w']);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and no errors, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['--rules-file', warningRcFile, '--file', warningPkg, '--ignore-warnings']);
      const expected = `
./tests/fixtures/warnings/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorWarningRcFile, '-f', errorWarningPkg, '--ignore-warnings']);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

./tests/fixtures/errorsAndWarnings/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });
  });

  context('when the cli is run quiet set', function() {
    it('and no errors, no warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', validRcFile, '-q']);
      const expected = '';

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorRcFile, '-f', errorPkg, '-q']);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

No warnings found!
./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and no errors, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['--rules-file', warningRcFile, '--file', warningPkg, '--quiet']);
      const expected = '';

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, one warning is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-c', errorWarningRcFile, '-f', errorWarningPkg, '--quiet']);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

1 warning
require-license - node: license - license is required

./tests/fixtures/errorsAndWarnings/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });
  });

  context('when the cli is run with individual rules', function() {
    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-r', 'require-scripts', '-f', errorPkg]);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-r', 'require-scripts', '-s', 'error', '-f', errorPkg]);
      const expected = `
1 error
require-scripts - node: scripts - scripts is required

./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-r', 'require-scripts', '-s', 'warning', '-f', errorPkg]);
      const expected = `
1 warning
require-scripts - node: scripts - scripts is required

./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });

    it('and one error, zero warnings is expected', function() {
      const cli = spawnSync('./src/cli.js', ['-r', 'require-scripts', '-s', 'off', '-f', errorPkg]);
      const expected = `
./tests/fixtures/errors/package.json check complete
`;

      cli.stdout.toString().should.equal(expected);
    });
  });
});
