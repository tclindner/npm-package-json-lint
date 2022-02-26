import path from 'path';
const debug = require('debug')('npm-package-json-lint:cosmicConfigTransformer');
import {applyExtendsIfSpecified} from './applyExtendsIfSpecified';
import {applyOverrides} from './applyOverrides';

export const transform = (cwd, configBaseDirectory, filePathBeingLinted) => {
  debug(`cwd: ${cwd}`);
  debug(`configBaseDirectory`);
  debug(configBaseDirectory);

  return (cosmiconfigResult) => {
    debug(`cosmiconfigResult`);
    debug(cosmiconfigResult);

    if (!cosmiconfigResult) {
      return null;
    }

    const {config, filepath} = cosmiconfigResult;

    debug(`cosmiconfigResult.config`);
    debug(config);
    debug(`cosmiconfigResult.filepath`);
    debug(filepath);

    /* eslint-disable-next-line no-unused-vars */
    const configDir = configBaseDirectory || path.dirname(filepath || '');
    const npmPackageJsonLintConfig = {...config};

    const configAfterExtends = applyExtendsIfSpecified(npmPackageJsonLintConfig, filePathBeingLinted);
    const configAfterOverrides = applyOverrides(
      cwd,
      filePathBeingLinted,
      configAfterExtends.rules,
      configAfterExtends.overrides
    );

    return configAfterOverrides;
  };
};
