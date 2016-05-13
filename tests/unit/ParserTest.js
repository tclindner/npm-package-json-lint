'use strict';

/* eslint max-nested-callbacks: "off" */

const fs = require('fs');
const should = require('should');
const sinon = require('sinon');
const requireHelper = require('../require_helper');
const Parser = requireHelper('Parser');

describe('Parser Unit Tests', function() {
  describe('parse method', function() {
    context('when file is present', function() {
      it('the parse should run fine', function() {
        const packageJson = {
          name: 'Marcel the Shell with Shoes On'
        };

        const parser = new Parser();
        const stub = sinon.stub(parser, '_readFile').returns(packageJson);

        parser.parse('package.json').should.equal(packageJson);
        parser._readFile.restore();
      });
    });

    context('when file is not present', function() {
      it('an error should be thrown', function() {
        const parser = new Parser();
        const stub = sinon.stub(parser, '_readFile').throws();

        (function() {
          parser.parse('missing.json');
        }).should.throw('missing.json does not exist :(');
        parser._readFile.restore();
      });
    });
  });

  describe('_readFile method', function() {
    context('when reading a JSON file', function() {
      it('an object should be returned', function() {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value'
        };

        const parser = new Parser();
        const stub = sinon.stub(fs, 'readFileSync').returns(json);

        parser._readFile('dummyFile.txt').should.eql(obj);
        fs.readFileSync.restore();
      });
    });
  });
});
