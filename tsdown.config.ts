// eslint-disable-next-line import-x/no-extraneous-dependencies
import {defineConfig} from 'tsdown';

const bundledAjvDependencies = [/^(?:ajv(?:-errors)?|fast-deep-equal|fast-uri|json-schema-traverse)(?:\/|$)/];

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
      // Bundle both packages and Ajv's runtime dependency closure so the
      // published artifact is independent of consumer module resolution.
      // The regex also matches subpath imports such as Ajv's codegen modules.
      alwaysBundle: bundledAjvDependencies,
      // neverBundle already makes alwaysBundle the explicit bundled set.
      onlyBundle: false,
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
      alwaysBundle: bundledAjvDependencies,
      onlyBundle: false,
    },

    // This ensures rules stay in dist/rules/ and API/CLI stay in dist/
    bundle: true,
  },
]);
