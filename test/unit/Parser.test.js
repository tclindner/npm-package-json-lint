'use strict';

const fs = require('fs');
const Parser = require('./../../src/Parser');

jest.mock('fs');

describe('Parser Unit Tests', function() {
  describe('parseJsonFile method', function() {
    describe('when file is present', function() {
      test('an object should be returned', function() {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value'
        };
        fs.readFileSync.mockReturnValue(json);

        expect(Parser.parseJsonFile('dummyFile.txt')).toStrictEqual(obj);
      });
    });

    describe('when file is not present', function() {
      test('an error should be thrown', function() {
        fs.readFileSync.mockImplementation(() => {
          throw new Error('Failed to read config file: missing.json. \nError: Error');
        });

        expect(() => {
          Parser.parseJsonFile('missing.json');
        }).toThrow('Failed to read config file: missing.json. \nError: Error');
      });
    });
  });

  // describe('parseJavaScriptFile method', function() {
  //   describe('when file is present', function() {
  //     test('an object should be returned', function() {
  //       const packageJson = {
  //         name: 'Marcel the Shell with Shoes On'
  //       };
  //       const stub = sinon.stub(fs, 'readFileSync').returns(packageJson);

  //       Parser.parseJavaScriptFile('package.json').should.equal(packageJson);
  //       fs.readFileSync.restore();
  //     });
  //   });

  //   describe('when file is not present', function() {
  //     test('an error should be thrown', function() {
  //       const stub = sinon.stub(fs, 'readFileSync').throws();

  //       (function() {
  //         Parser.parseJavaScriptFile('missing.json');
  //       }).should.throw('Failed to read config file: missing.json. \nError: Error');
  //       fs.readFileSync.restore();
  //     });
  //   });
  // });
});
