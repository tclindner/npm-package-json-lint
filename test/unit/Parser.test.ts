import fs from 'fs';
import {Parser} from '../../src/Parser';

jest.mock('fs');

describe('Parser Unit Tests', () => {
  describe('parseJsonFile method', () => {
    describe('when file is present', () => {
      test('an object should be returned', () => {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value',
        };
        // @ts-ignore-error
        fs.readFileSync.mockReturnValue(json);

        const parsedJson = Parser.parseJsonFile('dummyFile.txt');
        expect(parsedJson).toStrictEqual(obj);
        expect(parsedJson[Parser.sourceSymbol]).toStrictEqual(json);
      });
    });

    describe('when file is not present', () => {
      test('an error should be thrown', () => {
        // @ts-ignore-error
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
