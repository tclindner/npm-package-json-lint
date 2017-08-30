'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Config = require('./../../src/Config');

const should = chai.should();

describe('Config Unit Tests', function() {
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(passedConfig, {});
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
        const config = new Config(rcFileObj, {});
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

  context('_getUserConfig tests', function() {
    context('when config is passed', function() {
      it('the passed config should be returned', function() {
        const rulesObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const config = new Config(rulesObj, {});
        const stubIsConfigPassed = sinon.stub(config, '_isConfigPassed').returns(true);
        const stubGetPassedConfig = sinon.stub(config, '_getPassedConfig').returns(rulesObj);

        config._getUserConfig().should.eql(rulesObj);

        config._isConfigPassed.restore();
        config._getPassedConfig.restore();
      });
    });

    context('when config is passed in the package.json file', function() {
      it('the config should be returned', function() {
        const calledZeroTimes = 0;
        const rulesObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const pkgJson = {
          npmPackageJsonLintConfig: rulesObj
        };
        const config = new Config({}, pkgJson);
        const stubIsConfigPassed = sinon.stub(config, '_isConfigPassed').returns(false);
        const spyGetPassedConfig = sinon.spy(config, '_getPassedConfig');

        config._getUserConfig().should.eql(rulesObj);
        spyGetPassedConfig.callCount.should.eql(calledZeroTimes);

        config._isConfigPassed.restore();
        config._getPassedConfig.restore();
      });
    });

    context('when _isConfigFileExist is true', function() {
      it('the config should be returned', function() {
        const calledZeroTimes = 0;
        const rulesObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const config = new Config(rulesObj, {});
        const stubIsConfigPassed = sinon.stub(config, '_isConfigPassed').returns(false);
        const spyGetPassedConfig = sinon.spy(config, '_getPassedConfig');
        const stubGetRelativeConfigFilePath = sinon.stub(config, '_getRelativeConfigFilePth').returns('/home/user/project/.npmpackagejsonlintrc.json');
        const stubIsConfigFileExist = sinon.stub(config, '_isConfigFileExist').returns(true);
        const stubLoadConfigFile = sinon.stub(config, '_loadRcFile').returns(rulesObj);

        config._getUserConfig().should.eql(rulesObj);
        spyGetPassedConfig.callCount.should.eql(calledZeroTimes);

        config._isConfigPassed.restore();
        config._getPassedConfig.restore();
        config._getRelativeConfigFilePth.restore();
        config._isConfigFileExist.restore();
        config._loadRcFile.restore();
      });
    });

    context('when _loadRcFile is true', function() {
      it('the passed config should be returned', function() {
        const calledZeroTimes = 0;
        const rulesObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const config = new Config(rulesObj, {});
        const stubIsConfigPassed = sinon.stub(config, '_isConfigPassed').returns(false);
        const spyGetPassedConfig = sinon.spy(config, '_getPassedConfig');
        const stubGetRelativeConfigFilePath = sinon.stub(config, '_getRelativeConfigFilePth').returns('/home/user/project/.npmpackagejsonlintrc.json');
        const stubIsConfigFileExist = sinon.stub(config, '_isConfigFileExist')
          .onFirstCall()
          .returns(false)
          .onSecondCall()
          .returns(true);
        const spyLoadRcFile = sinon.spy(config, '_loadRcFile');
        const stubGetUserHomeConfigFilePath = sinon.stub(config, '_getUsrHmConfigFilePath').returns('/home/user/project/npmpackagejsonlint.config.js');
        const stubLoadConfigFile = sinon.stub(config, '_loadConfigFile').returns(rulesObj);

        config._getUserConfig().should.eql(rulesObj);
        spyGetPassedConfig.callCount.should.eql(calledZeroTimes);
        spyLoadRcFile.callCount.should.eql(calledZeroTimes);

        config._isConfigPassed.restore();
        config._getPassedConfig.restore();
        config._getRelativeConfigFilePth.restore();
        config._isConfigFileExist.restore();
        config._loadRcFile.restore();
        config._loadConfigFile.restore();
        config._getUsrHmConfigFilePath.restore();
      });
    });

    context('when config is passed', function() {
      it('the passed config should be returned', function() {
        const calledZeroTimes = 0;
        const rulesObj = {
          rules: {
            'require-author': 'error',
            'require-version': 'warning',
            'valid-values-author': ['error', ['Thomas', 'Lindner', 'Thomas Lindner']],
            'valid-values-private': ['warning', [true, false]]
          }
        };
        const config = new Config(rulesObj, {});
        const stubIsConfigPassed = sinon.stub(config, '_isConfigPassed').returns(false);
        const spyGetPassedConfig = sinon.spy(config, '_getPassedConfig');
        const stubGetRelativeConfigFilePath = sinon.stub(config, '_getRelativeConfigFilePth').returns('/home/user/project/.npmpackagejsonlintrc.json');
        const stubIsConfigFileExist = sinon.stub(config, '_isConfigFileExist').returns(false);
        const stubGetUserHomeConfigFilePath = sinon.stub(config, '_getUsrHmConfigFilePath').returns('/home/user/project/npmpackagejsonlint.config.js');
        const spyLoadConfigFile = sinon.spy(config, '_loadConfigFile');

        (function() {
          config._getUserConfig();
        }).should.throw('No configuration found');
        spyGetPassedConfig.callCount.should.eql(calledZeroTimes);
        spyLoadConfigFile.callCount.should.eql(calledZeroTimes);

        config._isConfigPassed.restore();
        config._getPassedConfig.restore();
        config._getRelativeConfigFilePth.restore();
        config._isConfigFileExist.restore();
        config._loadConfigFile.restore();
        config._getUsrHmConfigFilePath.restore();
      });
    });
  });

  context('_getRelativeConfigFilePth tests', function() {
    context('when config is passed', function() {
      it('the passed config should be returned', function() {
        const cwd = '/home/user/project/';
        const fileName = '.npmpackagejsonfilerc.json';
        const config = new Config({}, {});
        const stubIsConfigPassed = sinon.stub(process, 'cwd').returns(cwd);

        config._getRelativeConfigFilePth(fileName).should.eql(`${cwd}${fileName}`);

        process.cwd.restore();
      });
    });
  });

  context('_isConfigFileExist tests', function() {
    context('when config is passed', function() {
      it('the passed config should be returned', function() {
        const config = new Config({}, {});
        const stubIsConfigPassed = sinon.stub(fs, 'existsSync').returns(true);

        config._isConfigFileExist('filePath').should.be.true;

        fs.existsSync.restore();
      });
    });
  });

  context('isArrayRuleConfigValid tests', function() {
    context('when a rule is an array rule and the first key is not equal to error, warning, or off', function() {
      it('an error should be thrown', function() {
        (function() {
          Config.isArrayRuleConfigValid('valid-values-author', [true, ['Thomas', 'Lindner', 'Thomas Lindner']]);
        }).should.throw('valid-values-author - first key must be set to "error", "warning", or "off". Currently set to "true".');
      });
    });

    context('when a rule is an array rule and the second key is not an Array', function() {
      it('an error should be thrown', function() {
        (function() {
          Config.isArrayRuleConfigValid('valid-values-author', ['error', 'Thomas']);
        }).should.throw('valid-values-author - second key must be set an array. Currently set to "Thomas".');
      });
    });

    context('when a valid array rule config is passed', function() {
      it('true should be returned', function() {
        Config.isArrayRuleConfigValid('prefer-property-order', ['error', ['name', 'version']]).should.be.true;
      });
    });

    context('when a valid array rule config is passed with a value of off', function() {
      it('true should be returned', function() {
        Config.isArrayRuleConfigValid('prefer-property-order', 'off').should.be.true;
      });
    });

    context('when a invalid array rule config is passed with a value of error', function() {
      it('true should be returned', function() {
        (function() {
          Config.isArrayRuleConfigValid('valid-values-author', 'error');
        }).should.throw('valid-values-author - is an array type rule. It must be set to "off" if an array is not supplied.');
      });
    });
  });

  context('isStandardRuleConfigValid tests', function() {
    context('when a standard rule is passed with a value of error', function() {
      it('true should be returned', function() {
        Config.isStandardRuleConfigValid('require-author', 'error').should.be.true;
      });
    });

    context('when a standard rule is passed with a value of warning', function() {
      it('true should be returned', function() {
        Config.isStandardRuleConfigValid('require-author', 'warning').should.be.true;
      });
    });

    context('when a standard rule is passed with a value of off', function() {
      it('true should be returned', function() {
        Config.isStandardRuleConfigValid('require-author', 'off').should.be.true;
      });
    });

    context('when a rule is set to a boolean', function() {
      it('an error should be thrown', function() {
        (function() {
          Config.isStandardRuleConfigValid('require-author', true);
        }).should.throw('require-author - must be set to "error", "warning", or "off". Currently set to "true".');
      });
    });

    context('when a rule is set to a number', function() {
      it('an error should be thrown', function() {
        const dummyValue = 1;

        (function() {
          Config.isStandardRuleConfigValid('require-author', dummyValue);
        }).should.throw('require-author - must be set to "error", "warning", or "off". Currently set to "1".');
      });
    });
  });
});
