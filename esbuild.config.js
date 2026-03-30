/* eslint-disable @typescript-eslint/no-require-imports, import-x/no-extraneous-dependencies, unicorn/prefer-top-level-await */

// eslint-disable-next-line unicorn/prefer-module
const esbuild = require('esbuild');
// Automatically exclude all node_modules from the bundled version
// eslint-disable-next-line unicorn/prefer-module
const {nodeExternalsPlugin} = require('esbuild-node-externals');
// eslint-disable-next-line unicorn/prefer-module
const {readdirSync} = require('node:fs');
// eslint-disable-next-line unicorn/prefer-module
const path = require('node:path');

const rulesDirectory = path.join(__dirname, 'src', 'rules');
const bundle = true;
const minify = true;
const platform = 'node';
const sourcemap = true;
const target = 'node16';
const plugins = [nodeExternalsPlugin()];

readdirSync(rulesDirectory).forEach((file) => {
  const ruleFilePath = path.join(rulesDirectory, file);
  const beginIndex = 0;
  const endIndex = -3;
  const ruleFileNameWithoutExtension = file.slice(beginIndex, endIndex);

  esbuild
    .build({
      entryPoints: [ruleFilePath],
      outfile: `dist/rules/${ruleFileNameWithoutExtension}.js`,
      bundle,
      minify,
      platform,
      sourcemap: false,
      target,
      plugins,
    })
    // eslint-disable-next-line unicorn/no-process-exit
    .catch(() => process.exit(1));
});

esbuild
  .build({
    entryPoints: ['./src/api.ts'],
    outfile: 'dist/api.js',
    bundle,
    minify,
    platform,
    sourcemap,
    target,
    plugins,
  })
  // eslint-disable-next-line unicorn/no-process-exit
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['./src/cli.ts'],
    outfile: 'dist/cli.js',
    bundle,
    minify,
    platform,
    sourcemap,
    target,
    plugins,
  })
  // eslint-disable-next-line unicorn/no-process-exit
  .catch(() => process.exit(1));
