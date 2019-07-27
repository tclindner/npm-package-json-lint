const path = require('path');
const applyExtendsIfSpecified = require('./applyExtendsIfSpecified');
const applyOverrides = require('./applyOverrides');

const transform = (cwd, configBaseDirectory) => {
  return cosmiconfigResult => {
    if (!cosmiconfigResult) {
      return null;
    }

    const {config, filepath} = cosmiconfigResult;

    /* eslint-disable no-unused-vars */
    const configDir = configBaseDirectory || path.dirname(filepath || '');
    const npmPackageJsonLintConfig = {...config};

    const configAfterExtends = applyExtendsIfSpecified(npmPackageJsonLintConfig, filepath);
    const configAfterOverrides = applyOverrides(cwd, filepath, configAfterExtends.rules, configAfterExtends.overrides);

    return configAfterOverrides;
  };
};

module.exports = {
  transform
};
