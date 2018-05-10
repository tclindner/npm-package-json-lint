'use strict';

const chai = require('chai');
const ConfigFileType = require('./../../../src/config/ConfigFileType');

const should = chai.should();

describe('ConfigFileType Unit Tests', function() {
  it('rcFileName is .npmpackagejsonlintrc.json', function() {
    ConfigFileType.rcFileName.should.equal('.npmpackagejsonlintrc.json');
  });

  it('javaScriptConfigFileName is npmpackagejsonlint.config.js', function() {
    ConfigFileType.javaScriptConfigFileName.should.equal('npmpackagejsonlint.config.js');
  });
});
