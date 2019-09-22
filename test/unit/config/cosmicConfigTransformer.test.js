const path = require('path');
const cosmicConfigTransformer = require('../../../src/config/cosmicConfigTransformer');
const applyExtendsIfSpecified = require('../../../src/config/applyExtendsIfSpecified');
const applyOverrides = require('../../../src/config/applyOverrides');

jest.mock('path');
jest.mock('../../../src/config/applyExtendsIfSpecified');
jest.mock('../../../src/config/applyOverrides');

describe('cosmicConfigTransformer Unit Tests', () => {
  describe('transform method', () => {
    describe('no cosmiconfigResult', () => {
      test('null should be returned', () => {
        const cwd = 'cwd';
        const configBaseDirectory = 'configBaseDirectory';

        const transformer = cosmicConfigTransformer.transform(cwd, configBaseDirectory);
        const actual = transformer(null);
        expect(actual).toBeNull();
      });
    });

    describe('valid cosmiconfigResult - no configBaseDirectory', () => {
      test('null should be returned', () => {
        path.dirname.mockReturnValue('./myConfig');
        applyExtendsIfSpecified.mockReturnValue({
          rules: 'rules',
          overrides: 'overrides'
        });
        applyOverrides.mockReturnValue('appliedOverrides');

        const cwd = 'cwd';
        const configBaseDirectory = 'configBaseDirectory';

        const transformer = cosmicConfigTransformer.transform(cwd, configBaseDirectory);
        const cosmiconfigResult = {
          config: {
            property: 'value'
          },
          filepath: 'myFilePath'
        };
        const actual = transformer(cosmiconfigResult);
        expect(actual).toStrictEqual('appliedOverrides');

        expect(path.dirname).toHaveBeenCalledTimes(0);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(1);
        expect(applyExtendsIfSpecified).toHaveBeenCalledWith(cosmiconfigResult.config, cosmiconfigResult.filepath);
        expect(applyOverrides).toHaveBeenCalledTimes(1);
        expect(applyOverrides).toHaveBeenCalledWith(cwd, cosmiconfigResult.filepath, 'rules', 'overrides');
      });
    });

    describe('valid cosmiconfigResult - no configBaseDirectory', () => {
      test('null should be returned', () => {
        path.dirname.mockReturnValue('./myConfig');
        applyExtendsIfSpecified.mockReturnValue({
          rules: 'rules',
          overrides: 'overrides'
        });
        applyOverrides.mockReturnValue('appliedOverrides');

        const cwd = 'cwd';
        const configBaseDirectory = null;

        const transformer = cosmicConfigTransformer.transform(cwd, configBaseDirectory);
        const cosmiconfigResult = {
          config: {
            property: 'value'
          },
          filepath: 'myFilePath'
        };
        const actual = transformer(cosmiconfigResult);
        expect(actual).toStrictEqual('appliedOverrides');

        expect(path.dirname).toHaveBeenCalledTimes(1);
        expect(path.dirname).toHaveBeenCalledWith(cosmiconfigResult.filepath);
        expect(applyExtendsIfSpecified).toHaveBeenCalledTimes(1);
        expect(applyExtendsIfSpecified).toHaveBeenCalledWith(cosmiconfigResult.config, cosmiconfigResult.filepath);
        expect(applyOverrides).toHaveBeenCalledTimes(1);
        expect(applyOverrides).toHaveBeenCalledWith(cwd, cosmiconfigResult.filepath, 'rules', 'overrides');
      });
    });
  });
});
