const ConfigFileType = require('./../../../src/config/ConfigFileType');

describe('ConfigFileType Unit Tests', () => {
  test('rcFileName is .npmpackagejsonlintrc.json', () => {
    expect(ConfigFileType.rcFileName).toStrictEqual('.npmpackagejsonlintrc.json');
  });

  test('javaScriptConfigFileName is npmpackagejsonlint.config.js', () => {
    expect(ConfigFileType.javaScriptConfigFileName).toStrictEqual('npmpackagejsonlint.config.js');
  });
});
