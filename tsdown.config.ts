// eslint-disable-next-line import-x/no-extraneous-dependencies
import {defineConfig} from 'tsdown';

export default defineConfig([
  {
    entry: './src/rules/*.ts',
    outDir: 'dist/rules/',


    // Formatting & Minification
    fixedExtension: false,
    format: ['cjs'],
    dts: true,
    minify: true,
    sourcemap: true,
    // Disable content hashing for stable filenames
    hash: false,

    // External Dependencies
    // Replaces esbuild-node-externals plugin
    deps: {
      skipNodeModulesBundle: true,
    },

    // This ensures rules stay in dist/rules/ and api/cli stay in dist/
    bundle: true,
  },
  {
    entry: './src/api.ts',

    // Formatting & Minification
    fixedExtension: false,
    format: ['cjs'],
    dts: true,
    minify: true,
    sourcemap: true,
    // Disable content hashing for stable filenames
    hash: false,

    // External Dependencies
    // Replaces esbuild-node-externals plugin
    deps: {
      skipNodeModulesBundle: true,
    },

    // This ensures rules stay in dist/rules/ and api/cli stay in dist/
    bundle: true,
  },
  {
    entry: './src/cli.ts',
    shims: true,

    // Formatting & Minification
    fixedExtension: false,
    format: ['cjs'],
    dts: true,
    minify: true,
    sourcemap: true,
    // Disable content hashing for stable filenames
    hash: false,

    // External Dependencies
    // Replaces esbuild-node-externals plugin
    deps: {
      skipNodeModulesBundle: true,
    },

    // This ensures rules stay in dist/rules/ and api/cli stay in dist/
    bundle: true,
  },
]);
