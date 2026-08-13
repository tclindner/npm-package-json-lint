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
      neverBundle: true,
    },

    // This ensures rules stay in dist/rules/ and API/CLI stay in dist/
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
      neverBundle: true,
      // ajv-errors patches internals of the exact Ajv instance it is given.
      // If a consumer's dependency tree resolves a different (but semver-
      // compatible) copy of ajv for ajv-errors than the one used to create
      // that instance, schema compilation silently produces malformed code.
      // Bundling both removes any dependence on runtime module resolution.
      // Match subpath imports too (e.g. `ajv/dist/compile/codegen`, which
      // ajv-errors imports directly): a bare 'ajv'/'ajv-errors' entry only
      // matches the package root and leaves those subpaths external.
      alwaysBundle: [/^ajv(-errors)?(\/|$)/],
    },

    // This ensures rules stay in dist/rules/ and API/CLI stay in dist/
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
      neverBundle: true,
      // See the comment in the api.ts config above.
      alwaysBundle: [/^ajv(-errors)?(\/|$)/],
    },

    // This ensures rules stay in dist/rules/ and API/CLI stay in dist/
    bundle: true,
  },
]);
