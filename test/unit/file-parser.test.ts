import fs from 'fs';
import {parseJsonFile, sourceSymbol} from '../../src/file-parser';

jest.mock('fs');

describe('Parser Unit Tests', () => {
  describe('parseJsonFile method', () => {
    describe('when file is present', () => {
      test('an object should be returned', () => {
        const json = '{"key": "value"}';
        const obj = {
          key: 'value',
        };
        // @ts-expect-error-error
        fs.readFileSync.mockReturnValue(json);

        const parsedJson = parseJsonFile('dummyFile.txt');
        expect(parsedJson).toStrictEqual(obj);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(parsedJson[sourceSymbol]).toStrictEqual(json);
      });
    });

    describe('when file is not present', () => {
      test('an error should be thrown', () => {
        // @ts-expect-error-error
        fs.readFileSync.mockImplementation(() => {
          throw new Error('Failed to read config file: missing.json. \nError: Error');
        });

        expect(() => {
          parseJsonFile('missing.json');
        }).toThrow('Failed to read config file: missing.json. \nError: Error');
      });
    });
  });
});
