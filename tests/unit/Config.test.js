'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Config = require('./../../src/Config');

const should = chai.should();

describe('Config Unit Tests', function() {
  context('when an empty object is passed', function() {
    it('the default config object should be returned', function() {
      const passedConfig = {};
      const config = new Config(passedConfig);

      (function() {
        config.get(passedConfig);
      }).should.throw('No configuration passed');
    });
  });

  context('Tests for when a filepath is passed', function() {
    let spy;

    beforeEach(function() {
      const stub = sinon.stub(fs, 'readFileSync');

      stub.returns('{"rules": {"version-type": "error"}}');

      spy = sinon.spy(path, 'join');
    });

    afterEach(function() {
      fs.readFileSync.restore();
      path.join.restore();
    });

    context('when a relative path string to a .npmpackagejsonlintrc file is passed', function() {
      it('the config object should return the parsed JSON as an object', function() {
        const passedConfig = './.npmpackagejsonlintrc';
        const config = new Config(passedConfig);
        const expectedConfigObj = {
          'version-type': 'error'
        };
        const result = config.get();

        spy.calledOnce.should.be.true;
        spy.firstCall.calledWithExactly(__dirname, passedConfig);
        result.should.eql(expectedConfigObj);
      });
    });

    context('when an absolute path string to a .npmpackagejsonlintrc file is passed', function() {
      it('the config object should return the parsed JSON as an object', function() {
        const passedConfig = '/Users/awesomeUser/.npmpackagejsonlintrc';
        const config = new Config(passedConfig);
        const expectedConfigObj = {
          'version-type': 'error'
        };
        const result = config.get();

        spy.called.should.be.false;
        result.should.eql(expectedConfigObj);
      });
    });
  });

  context('Tests for when a extends is passed', function() {
    let spy;

    beforeEach(function() {
      const stub = sinon.stub(fs, 'readFileSync');

      stub.returns('{"extends": "npm-package-json-lint-config-base", "rules": {"version-type": "off"}}');

      spy = sinon.spy(path, 'join');
    });

    afterEach(function() {
      fs.readFileSync.restore();
      path.join.restore();
    });

    context('when a config object is passed with an extends node', function() {
      it('the extends config and rules node should be merged', function() {
        const passedConfig = './.npmpackagejsonlintrc';
        const config = new Config(passedConfig);
        const stubbedGetExtendCfgModule = sinon.stub(config, '_getExtendsConfigModule');
        const extendsObj = {
          rules: {
            'name-type': 'error'
          }
        };

        stubbedGetExtendCfgModule.returns(extendsObj);

        const expectedConfigObj = {
          'name-type': 'error',
          'version-type': 'off'
        };
        const result = config.get();

        spy.calledOnce.should.be.true;
        spy.firstCall.calledWithExactly(__dirname, passedConfig);
        result.should.eql(expectedConfigObj);

        config._getExtendsConfigModule.restore();
      });

      it('and they both contain the same rule the main rules node should take precedence', function() {
        const passedConfig = './.npmpackagejsonlintrc';
        const config = new Config(passedConfig);
        const stubbedGetExtendCfgModule = sinon.stub(config, '_getExtendsConfigModule');
        const extendsObj = {
          rules: {
            'version-type': 'warning'
          }
        };

        stubbedGetExtendCfgModule.returns(extendsObj);

        const expectedConfigObj = {
          'version-type': 'off'
        };
        const result = config.get();

        spy.calledOnce.should.be.true;
        spy.firstCall.calledWithExactly(__dirname, passedConfig);
        result.should.eql(expectedConfigObj);

        config._getExtendsConfigModule.restore();
      });

      it('and the module name is relative path', function() {
        const moduleName = './index.js';
        const passedConfig = {
          'extends': './index.js',
          'rules': {
            'version-type': 'warning'
          }
        };
        const config = new Config(passedConfig);
        const extendsObj = {
          rules: {
            'version-type': 'warning'
          }
        };
        const stubbedGetExtendCfgModule = sinon.stub(config, '_getExtendsConfigModule').returns(extendsObj);
        const result = config.get(moduleName);
        const expectedObj = {
          'version-type': 'warning'
        };

        spy.calledOnce.should.be.true;
        spy.firstCall.calledWithExactly(process.cwd(), moduleName);
        stubbedGetExtendCfgModule.calledWithExactly(path.join(process.cwd(), moduleName));
        result.should.eql(expectedObj);

        config._getExtendsConfigModule.restore();
      });

      it('and the module name is a node module', function() {
        const moduleName = 'npm-package-json-lint-config-tc';
        const passedConfig = {
          'extends': 'npm-package-json-lint-config-tc'
        };
        const config = new Config(passedConfig);
        const extendsObj = {
          rules: {
            'version-type': 'warning'
          }
        };
        const stubbedGetExtendCfgModule = sinon.stub(config, '_getExtendsConfigModule').returns(extendsObj);
        const result = config.get();
        const expectedObj = {
          'version-type': 'warning'
        };

        spy.called.should.be.false;
        stubbedGetExtendCfgModule.calledWithExactly(moduleName);
        result.should.eql(expectedObj);

        config._getExtendsConfigModule.restore();
      });
    });
  });

  context('Tests for when a config object is passed', function() {
    context('when a valid npmpackagejsonlintrc file object is passed', function() {
      it('the config object should return the parsed JSON as an object', function() {
        const rcFileObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const config = new Config(rcFileObj);
        const expectedConfigObj = {
          'require-author': 'error',
          'require-version': 'warning',
          'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
          'valid-values-private': ['warning', [true, false]]
        };

        config.get().should.eql(expectedConfigObj);
      });
    });
  });

  context('_validateRulesConfig tests', function() {
    context('when a valid npmpackagejsonlintrc file object is passed', function() {
      it('true should be returned', function() {
        const rcFileObj = {
          'require-author': 'error',
          'require-version': 'warning',
          'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
          'valid-values-private': ['warning', [true, false]]
        };
        const config = new Config(rcFileObj);

        config._validateRulesConfig(rcFileObj).should.eql(true);
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

        config._validateRulesConfig(rcFileObj).should.eql(true);
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
          config._validateRulesConfig(rcFileObj);
        }).should.throw('require-author - must be set to "error", "warning", or "off". Currently set to true');
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
          config._validateRulesConfig(rcFileObj);
        }).should.throw('require-author - must be set to "error", "warning", or "off". Currently set to 1');
      });
    });

    context('when a rule is an array rule and the first key is not equal to error, warning, or off', function() {
      it('an error should be thrown', function() {
        const rcFileObj = {
          'require-author': 'error',
          'require-version': 'warning',
          'valid-values-author': [true, ['Thomas', 'Lindner', 'Thomas Lindner']],
          'valid-values-private': ['warning', [true, false]]
        };
        const config = new Config(rcFileObj);

        (function() {
          config._validateRulesConfig(rcFileObj);
        }).should.throw('valid-values-author - first key must be set to "error", "warning", or "off". Currently set to true');
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
          config._validateRulesConfig(rcFileObj);
        }).should.throw('valid-values-author - second key must be set an array. Currently set to Thomas');
      });
    });
  });
});
