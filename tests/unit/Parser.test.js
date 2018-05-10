'use strict';

const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const Parser = require('./../../src/Parser');

const should = chai.should();

describe('Parser Unit Tests', function() {
  describe('parseJsonFile method', function() {
    context('when file is present', function() {
      it('an object should be returned', function() {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value'
        };
        const stub = sinon.stub(fs, 'readFileSync').returns(json);

        Parser.parseJsonFile('dummyFile.txt').should.eql(obj);
        fs.readFileSync.restore();
      });
    });

    context('when file is not present', function() {
      it('an error should be thrown', function() {
        const stub = sinon.stub(fs, 'readFileSync').throws();

        (function() {
          Parser.parseJsonFile('missing.json');
        }).should.throw('Failed to read config file: missing.json. \nError: Error');
        fs.readFileSync.restore();
      });
    });
  });

  // describe('parseJavaScriptFile method', function() {
  //   context('when file is present', function() {
  //     it('an object should be returned', function() {
  //       const packageJson = {
  //         name: 'Marcel the Shell with Shoes On'
  //       };
  //       const stub = sinon.stub(fs, 'readFileSync').returns(packageJson);

  //       Parser.parseJavaScriptFile('package.json').should.equal(packageJson);
  //       fs.readFileSync.restore();
  //     });
  //   });

  //   context('when file is not present', function() {
  //     it('an error should be thrown', function() {
  //       const stub = sinon.stub(fs, 'readFileSync').throws();

  //       (function() {
  //         Parser.parseJavaScriptFile('missing.json');
  //       }).should.throw('Failed to read config file: missing.json. \nError: Error');
  //       fs.readFileSync.restore();
  //     });
  //   });
  // });
});
