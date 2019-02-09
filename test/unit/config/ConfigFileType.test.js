'use strict';

const ConfigFileType = require('./../../../src/config/ConfigFileType');

describe('ConfigFileType Unit Tests', function() {
  test('rcFileName is .npmpackagejsonlintrc.json', function() {
    expect(ConfigFileType.rcFileName).toStrictEqual('.npmpackagejsonlintrc.json');
  });

  test('javaScriptConfigFileName is npmpackagejsonlint.config.js', function() {
    expect(ConfigFileType.javaScriptConfigFileName).toStrictEqual('npmpackagejsonlint.config.js');
  });
});
