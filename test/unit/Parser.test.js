const fs = require('fs');
const Parser = require('./../../src/Parser');

jest.mock('fs');

describe('Parser Unit Tests', () => {
  describe('parseJsonFile method', () => {
    describe('when file is present', () => {
      test('an object should be returned', () => {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value'
        };
        fs.readFileSync.mockReturnValue(json);

        expect(Parser.parseJsonFile('dummyFile.txt')).toStrictEqual(obj);
      });
    });

    describe('when file is not present', () => {
      test('an error should be thrown', () => {
        fs.readFileSync.mockImplementation(() => {
          throw new Error('Failed to read config file: missing.json. \nError: Error');
        });

        expect(() => {
          Parser.parseJsonFile('missing.json');
        }).toThrow('Failed to read config file: missing.json. \nError: Error');
      });
    });
  });
});
