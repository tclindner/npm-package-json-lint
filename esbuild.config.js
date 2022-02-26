const esbuild = require('esbuild');

// Automatically exclude all node_modules from the bundled version
const {nodeExternalsPlugin} = require('esbuild-node-externals');

esbuild
  .build({
    entryPoints: ['./src/api.ts'],
    outfile: 'dist/api.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['./src/cli.ts'],
    outfile: 'dist/cli.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
