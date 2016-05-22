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

    stub.returns('{"version-type": "error"}');

    spy = sinon.spy(path, 'join');
  });

  afterEach(function() {
    fs.readFileSync.restore();
    path.join.restore();
  });

  context('when a rules object is passed', function() {
    it('the config object should return that object', function() {
      const passedConfig = {
        'version-type': 'error'
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
        'version-type': 'error'
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
        'version-type': 'error'
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

  context('when a valid npmpackagejsonlintrc file object is passed', function() {
    it('true should be returned', function() {
      const rcFileObj = {
        'require-author': 'error',
        'require-version': 'warning',
        'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
        'valid-values-private': ['warning', [true, false]]
      };
      const config = new Config(rcFileObj);

      config._validateConfig(rcFileObj).should.eql(true);
    });
  });

  context('when a rule is set to a boolean', function() {
    it('an error should be thrown', function() {
      const rcFileObj = {
        'require-author': true,
        'require-version': 'warning',
        'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
        'valid-values-private': ['warning', [true, false]]
      };
      const config = new Config(rcFileObj);

      (function() {
        config._validateConfig(rcFileObj);
      }).should.throw('require-author - must be set to "error" or "warning". Currently set to true');
    });
  });

  context('when a rule is set to a number', function() {
    it('an error should be thrown', function() {
      const rcFileObj = {
        'require-author': 1,
        'require-version': 'warning',
        'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
        'valid-values-private': ['warning', [true, false]]
      };
      const config = new Config(rcFileObj);

      (function() {
        config._validateConfig(rcFileObj);
      }).should.throw('require-author - must be set to "error" or "warning". Currently set to 1');
    });
  });

  context('when a rule is an array rule and the first key is not equal to error or warning', function() {
    it('an error should be thrown', function() {
      const rcFileObj = {
        'require-author': 'error',
        'require-version': 'warning',
        'valid-values-author': [true, ['Thomas', 'Lindner', 'Thomas Lindner']],
        'valid-values-private': ['warning', [true, false]]
      };
      const config = new Config(rcFileObj);

      (function() {
        config._validateConfig(rcFileObj);
      }).should.throw('valid-values-author - first key must be set to "error" or "warning". Currently set to true');
    });
  });

  context('when a rule is an array rule and the second key is not an Array', function() {
    it('an error should be thrown', function() {
      const rcFileObj = {
        'require-author': 'error',
        'require-version': 'warning',
        'valid-values-author': ['error', 'Thomas'],
        'valid-values-private': ['warning', [true, false]]
      };
      const config = new Config(rcFileObj);

      (function() {
        config._validateConfig(rcFileObj);
      }).should.throw('valid-values-author - second key must be set an array. Currently set to Thomas');
    });
  });
});
