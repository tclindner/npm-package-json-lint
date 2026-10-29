// eslint-disable-next-line @typescript-eslint/no-require-imports
const {execFileSync, spawnSync} = require('node:child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} = require('node:fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const {tmpdir} = require('node:os');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

const npmCliPath = process.env.npm_execpath;
const systemNpmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmExecutable = npmCliPath ? process.execPath : systemNpmExecutable;
const projectRoot = path.resolve(__dirname, '../..');

const createNpmEnvironment = (npmUserConfig) => {
  const environment = {
    ...process.env,
    NO_UPDATE_NOTIFIER: '1',
  };

  delete environment.npm_config_allow_scripts;
  delete environment.npm_config_strict_allow_scripts;
  delete environment.npm_config_userconfig;

  if (npmUserConfig) {
    environment.NPM_CONFIG_USERCONFIG = npmUserConfig;
  }

  return environment;
};

const runNpm = (arguments_, cwd, npmUserConfig) =>
  execFileSync(npmExecutable, npmCliPath ? [npmCliPath, ...arguments_] : arguments_, {
    cwd,
    encoding: 'utf8',
    env: createNpmEnvironment(npmUserConfig),
    shell: !npmCliPath && process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

const readPackageVersion = (packageJsonPath) => JSON.parse(readFileSync(packageJsonPath, 'utf8')).version;

const runPackedCli = (consumerDirectory, arguments_ = [], cliPath = '') =>
  spawnSync(
    process.execPath,
    [
      cliPath || path.join(consumerDirectory, 'node_modules', 'npm-package-json-lint', 'dist', 'cli.js'),
      ...arguments_,
      '--quiet',
      './package.json',
    ],
    {
      cwd: consumerDirectory,
      encoding: 'utf8',
      env: {
        ...process.env,
        FORCE_COLOR: '0',
      },
    },
  );

const runPackedApi = (consumerDirectory, options) =>
  spawnSync(
    process.execPath,
    [
      '--eval',
      `const {NpmPackageJsonLint} = require('npm-package-json-lint');
const result = new NpmPackageJsonLint({...JSON.parse(process.argv[1]), cwd: process.cwd()}).lint();
console.log(JSON.stringify(result));
if (result.errorCount > 0) process.exitCode = 2;`,
      JSON.stringify(options || {patterns: ['./package.json']}),
    ],
    {
      cwd: consumerDirectory,
      encoding: 'utf8',
      env: {
        ...process.env,
        FORCE_COLOR: '0',
      },
    },
  );

describe('packed consumer', () => {
  test('entrypoints work in clean and conflicting Ajv dependency trees', () => {
    const temporaryRoot = mkdtempSync(path.join(tmpdir(), 'npm-package-json-lint-packed-consumer-'));

    try {
      const npmUserConfig = path.join(temporaryRoot, '.npmrc');
      writeFileSync(npmUserConfig, '');

      const packMetadata = JSON.parse(runNpm(['pack', '--json', '--pack-destination', temporaryRoot], projectRoot));
      const packEntries = Array.isArray(packMetadata) ? packMetadata : Object.values(packMetadata);

      expect(packEntries).toHaveLength(1);

      const [packEntry] = packEntries;
      expect(packEntry).toStrictEqual(expect.objectContaining({filename: expect.any(String)}));

      const tarballPath = path.join(temporaryRoot, packEntry.filename);
      writeFileSync(
        path.join(temporaryRoot, 'package.json'),
        `${JSON.stringify(
          {
            name: 'npm-package-json-lint-packed-consumer',
            version: '1.0.0',
            private: true,
            npmpackagejsonlint: {
              rules: {
                'bin-type': 'error',
              },
            },
          },
          null,
          2,
        )}\n`,
      );

      runNpm(
        ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', tarballPath],
        temporaryRoot,
        npmUserConfig,
      );

      expect(existsSync(path.join(temporaryRoot, 'node_modules', 'ajv'))).toBe(false);
      expect(existsSync(path.join(temporaryRoot, 'node_modules', 'ajv-errors'))).toBe(false);
      expect(existsSync(path.join(temporaryRoot, 'node_modules', 'fast-deep-equal'))).toBe(false);
      expect(existsSync(path.join(temporaryRoot, 'node_modules', 'fast-uri'))).toBe(false);
      expect(existsSync(path.join(temporaryRoot, 'node_modules', 'json-schema-traverse'))).toBe(false);

      const cleanResult = runPackedCli(temporaryRoot);
      expect(cleanResult).toStrictEqual(expect.objectContaining({status: 0, stderr: ''}));
      const cleanApiResult = runPackedApi(temporaryRoot);
      expect(cleanApiResult).toStrictEqual(expect.objectContaining({status: 0, stderr: ''}));

      runNpm(
        ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', '--save-exact', 'ajv@8.18.0'],
        temporaryRoot,
        npmUserConfig,
      );

      expect(readPackageVersion(path.join(temporaryRoot, 'node_modules', 'ajv', 'package.json'))).toBe('8.18.0');
      const conflictingResult = runPackedCli(temporaryRoot);
      expect(conflictingResult).toStrictEqual(expect.objectContaining({status: 0, stderr: ''}));
      const conflictingApiResult = runPackedApi(temporaryRoot);
      expect(conflictingApiResult).toStrictEqual(expect.objectContaining({status: 0, stderr: ''}));
    } finally {
      rmSync(temporaryRoot, {recursive: true, force: true});
    }
  }, 120_000);
});

describe('built and packed consumer duplicate properties', () => {
  let directory;

  beforeAll(() => {
    directory = mkdtempSync(path.join(tmpdir(), 'npm-package-json-lint-packed-duplicates-'));
    const npmUserConfig = path.join(directory, '.npmrc');
    writeFileSync(npmUserConfig, '');
    writeFileSync(path.join(directory, 'package.json'), '{"name":"duplicate-properties-consumer","private":true}');

    const packMetadata = JSON.parse(runNpm(['pack', '--json', '--pack-destination', directory], projectRoot));
    const packEntries = Array.isArray(packMetadata) ? packMetadata : Object.values(packMetadata);
    runNpm(
      [
        'install',
        '--ignore-scripts',
        '--no-audit',
        '--no-fund',
        '--package-lock=false',
        path.join(directory, packEntries[0].filename),
      ],
      directory,
      npmUserConfig,
    );
  }, 120_000);

  afterAll(() => {
    if (directory) {
      rmSync(directory, {recursive: true, force: true});
    }
  });

  test.each([
    {description: 'valid JSON', source: '{"name":"a"}'},
    {description: 'top-level duplicates', source: '{"name":"a","name":"b"}', duplicate: 'name'},
    {description: 'nested duplicates', source: '{"scripts":{"build":"a","build":"b"}}', duplicate: 'build'},
    {description: 'keys in separate objects', source: '{"scripts":{"build":"a"},"config":{"build":"b"}}'},
    {description: 'disabled top-level duplicates', source: '{"name":"a","name":"b"}', severity: 'off'},
    {description: 'disabled nested duplicates', source: '{"scripts":{"build":"a","build":"b"}}', severity: 'off'},
  ])('$description', ({source, severity = 'error', duplicate}) => {
    const config = {rules: {'no-duplicate-properties': severity}};
    const configFile = path.join(directory, '.npmpackagejsonlintrc.json');
    writeFileSync(configFile, JSON.stringify(config));
    writeFileSync(path.join(directory, 'package.json'), source);

    const expectedProcess = expect.objectContaining({status: duplicate ? 2 : 0, stderr: ''});
    const arguments_ = ['--configFile', configFile];
    const expectedCli = expect.objectContaining({
      status: duplicate ? 2 : 0,
      stderr: '',
      stdout: expect.stringMatching(
        duplicate ? new RegExp(`no-duplicate-properties.*Please remove duplicates for: ${duplicate}[.]`) : /^$/u,
      ),
    });
    expect([
      runPackedCli(directory, arguments_),
      runPackedCli(directory, arguments_, path.join(projectRoot, 'dist', 'cli.js')),
    ]).toStrictEqual([expectedCli, expectedCli]);
    const api = runPackedApi(directory, {patterns: ['./package.json'], config});
    expect(api).toStrictEqual(expectedProcess);
    const errorCount = duplicate ? 1 : 0;
    const expectedIssue = expect.objectContaining({
      lintId: 'no-duplicate-properties',
      severity: 'error',
      lintMessage: `Duplicate properties detected. Please remove duplicates for: ${duplicate}.`,
    });
    expect(JSON.parse(api.stdout)).toStrictEqual(
      expect.objectContaining({
        errorCount,
        results: [expect.objectContaining({ignored: false, errorCount, issues: duplicate ? [expectedIssue] : []})],
      }),
    );
  });

  test('object input without source metadata preserves the fallback', () => {
    const api = runPackedApi(directory, {
      packageJsonObject: JSON.parse('{"name":"a","name":"b"}'),
      packageJsonFilePath: './package.json',
      config: {rules: {'no-duplicate-properties': 'error'}},
    });

    expect(api).toStrictEqual(expect.objectContaining({status: 0, stderr: ''}));
    expect(JSON.parse(api.stdout)).toStrictEqual(
      expect.objectContaining({
        errorCount: 0,
        results: [expect.objectContaining({ignored: false, issues: []})],
      }),
    );
  });
});
