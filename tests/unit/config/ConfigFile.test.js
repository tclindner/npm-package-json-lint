'use strict';

/* eslint max-lines: 'off', id-length: 'off' */

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const Config = require('./../../../src/Config');
const ConfigFile = require('./../../../src/config/ConfigFile');
const ConfigValidator = require('./../../../src/config/ConfigValidator');
const NpmPackageJsonLint = require('./../../../src/NpmPackageJsonLint');
const Parser = require('./../../../src/Parser');

const should = chai.should();
const linterContext = new NpmPackageJsonLint();

const options = {
  configFile: '',
  cwd: process.cwd(),
  useConfigFiles: true,
  rules: {}
};
const config = new Config(options, linterContext);

describe('ConfigFile Unit Tests', function() {
  context('createEmptyConfig method', function() {
    it('when called an empty config object is returned', function() {
      const result = ConfigFile.createEmptyConfig();
      const expected = {
        rules: {}
      };

      result.should.deep.equal(expected);
    });
  });

  context('loadFromPackageJson method', function() {
    it('when package.json property does not exist, an empty config object is returned', function() {
      const stubParser = sinon.stub(Parser, 'parseJsonFile');
      const stubValidator = sinon.stub(ConfigValidator, 'validate');

      stubParser.returns({name: 'name'});

      const expectedConfigObj = {
        rules: {}
      };
      const filePath = './package.json';
      const result = ConfigFile.loadFromPackageJson(filePath, config);

      stubParser.calledOnce.should.be.true;
      stubParser.firstCall.calledWithExactly(filePath).should.be.true;

      stubValidator.calledOnce.should.be.true;
      stubValidator.firstCall.calledWithExactly(config, filePath, linterContext);

      result.should.deep.equal(expectedConfigObj);

      Parser.parseJsonFile.restore();
      ConfigValidator.validate.restore();
    });

    it('when package.json property does exist and is valid, a config object is returned', function() {
      const stubParser = sinon.stub(Parser, 'parseJsonFile');
      const stubValidator = sinon.stub(ConfigValidator, 'validate');

      stubParser.returns({
        name: 'name',
        npmPackageJsonLintConfig: {
          rules: {
            'require-name': 'error'
          }
        }
      });

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './package.json';
      const result = ConfigFile.loadFromPackageJson(filePath, config);

      stubParser.calledOnce.should.be.true;
      stubParser.firstCall.calledWithExactly(filePath).should.be.true;

      stubValidator.calledOnce.should.be.true;
      stubValidator.firstCall.calledWithExactly(config, filePath, linterContext);

      result.should.deep.equal(expectedConfigObj);

      Parser.parseJsonFile.restore();
      ConfigValidator.validate.restore();
    });
  });

  context('load method', function() {
    it('when file is rc file (json), a config object is returned', function() {
      const stubParserJson = sinon.stub(Parser, 'parseJsonFile');
      const stubParserJs = sinon.stub(Parser, 'parseJavaScriptFile');
      const stubValidator = sinon.stub(ConfigValidator, 'validate');

      stubParserJson.returns({rules: {'require-name': 'error'}});

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      stubParserJson.calledOnce.should.be.true;
      stubParserJson.firstCall.calledWithExactly(filePath).should.be.true;

      stubParserJs.notCalled.should.be.true;

      stubValidator.calledOnce.should.be.true;
      stubValidator.firstCall.calledWithExactly(config, filePath, linterContext);

      result.should.deep.equal(expectedConfigObj);

      Parser.parseJsonFile.restore();
      Parser.parseJavaScriptFile.restore();
      ConfigValidator.validate.restore();
    });

    it('when file is js file, a config object is returned', function() {
      const stubParserJson = sinon.stub(Parser, 'parseJsonFile');
      const stubParserJs = sinon.stub(Parser, 'parseJavaScriptFile');
      const stubValidator = sinon.stub(ConfigValidator, 'validate');

      stubParserJs.returns({rules: {'require-name': 'error'}});

      const expectedConfigObj = {
        rules: {
          'require-name': 'error'
        }
      };
      const filePath = './npmpackagejsonlint.config.js';
      const result = ConfigFile.load(filePath, config);

      stubParserJson.notCalled.should.be.true;

      stubParserJs.calledOnce.should.be.true;
      stubParserJs.firstCall.calledWithExactly(filePath).should.be.true;

      stubValidator.calledOnce.should.be.true;
      stubValidator.firstCall.calledWithExactly(config, filePath, linterContext);

      result.should.deep.equal(expectedConfigObj);

      Parser.parseJsonFile.restore();
      Parser.parseJavaScriptFile.restore();
      ConfigValidator.validate.restore();
    });

    it('when file is yaml file, an error is thrown', function() {
      const stubParserJson = sinon.stub(Parser, 'parseJsonFile');
      const stubParserJs = sinon.stub(Parser, 'parseJavaScriptFile');
      const stubValidator = sinon.stub(ConfigValidator, 'validate');

      const filePath = './npmpackagejsonlint.config.yaml';

      (function() {
        ConfigFile.load(filePath, config);
      }).should.throw('Unsupport config file extension. File path: ./npmpackagejsonlint.config.yaml');

      stubParserJson.notCalled.should.be.true;

      stubParserJs.notCalled.should.be.true;

      stubValidator.notCalled.should.be.true;

      Parser.parseJsonFile.restore();
      Parser.parseJavaScriptFile.restore();
      ConfigValidator.validate.restore();
    });

    it('when file has local extends (valid), a config object is returned', function() {
      const expectedConfigObj = {
        'extends': './tests/fixtures/extendsLocal/npmpackagejsonlint.config.js',
        'rules': {
          'require-author': 'error',
          'require-description': 'error'
        }
      };
      const filePath = './tests/fixtures/extendsLocal/.npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      result.should.deep.equal(expectedConfigObj);
    });

    it('when file has local extends (invalid), a config object is returned', function() {
      const filePath = './tests/fixtures/extendsLocalInvalid/.npmpackagejsonlintrc.json';

      (function() {
        ConfigFile.load(filePath, config);
      }).should.throw();
    });

    it('when file has module extends (valid), a config object is returned', function() {
      const expectedConfigObj = {
        'extends': 'npm-package-json-lint-config-default',
        'rules': {
          'bin-type': 'error',
          'config-type': 'error',
          'cpu-type': 'error',
          'dependencies-type': 'error',
          'description-type': 'error',
          'devDependencies-type': 'error',
          'directories-type': 'error',
          'engines-type': 'error',
          'files-type': 'error',
          'homepage-type': 'error',
          'keywords-type': 'error',
          'license-type': 'error',
          'main-type': 'error',
          'man-type': 'error',
          'name-format': 'error',
          'name-type': 'error',
          'optionalDependencies-type': 'error',
          'os-type': 'error',
          'peerDependencies-type': 'error',
          'preferGlobal-type': 'error',
          'private-type': 'error',
          'repository-type': 'error',
          'require-author': 'error',
          'require-name': 'error',
          'require-version': 'error',
          'scripts-type': 'error',
          'version-format': 'error',
          'version-type': 'error'
        }
      };
      const filePath = './tests/fixtures/extendsModule/.npmpackagejsonlintrc.json';
      const result = ConfigFile.load(filePath, config);

      result.should.deep.equal(expectedConfigObj);
    });

    it('when file module extends (invalid), a config object is returned', function() {
      const filePath = './tests/fixtures/extendsModuleInvalid/.npmpackagejsonlintrc.json';

      (function() {
        ConfigFile.load(filePath, config);
      }).should.throw();
    });
  });
});
