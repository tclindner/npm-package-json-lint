'use strict';

const fs = require('fs');
const path = require('path');
const should = require('should');
const sinon = require('sinon');
const requireHelper = require('../require_helper');
const Config = requireHelper('Config');
const defaultConfig = requireHelper('defaultConfig');

describe('Config Unit Tests', function() {
  let spy;

  beforeEach(function() {
    const stub = sinon.stub(fs, 'readFileSync');

    stub.returns('{"version-type": true}');

    spy = sinon.spy(path, 'join');
  });

  afterEach(function() {
    fs.readFileSync.restore();
    path.join.restore();
  });

  context('when a rules object is passed', function() {
    it('the config object should return that object', function() {
      const passedConfig = {
        'version-type': true
      };
      const config = new Config(passedConfig);

      config.get().should.eql(passedConfig);
    });
  });

  context('when a relative path string to a .npmpackagejsonlintrc file is passed', function() {
    it('the config object should return the parsed JSON as an object', function() {
      const passedConfig = './.npmpackagejsonlintrc';
      const config = new Config(passedConfig);
      const obj = {
        'version-type': true
      };

      spy.calledOnce.should.be.true();
      spy.firstCall.calledWithExactly(__dirname, passedConfig);
      config.get().should.eql(obj);
    });
  });

  context('when an absolute path string to a .npmpackagejsonlintrc file is passed', function() {
    it('the config object should return the parsed JSON as an object', function() {
      const passedConfig = '/Users/awesomeUser/.npmpackagejsonlintrc';
      const config = new Config(passedConfig);
      const obj = {
        'version-type': true
      };

      spy.called.should.be.false();
      config.get().should.eql(obj);
    });
  });

  context('when an empty object is passed', function() {
    it('the default config object should be returned', function() {
      const passedConfig = {};
      const config = new Config(passedConfig);

      config.get().should.eql(defaultConfig);
    });
  });
});
