import fs from 'fs';
import ignore from 'ignore';
import getIgnorer from '../../../src/utils/getIgnorer';

jest.mock('fs');
jest.mock('ignore');

describe('getIgnorer Unit Tests', () => {
  test('ignore file passed (relative) and found', () => {
    const ignorePath = '../../fixtures/ignorePath/.gitignore-example';
    const cwd = process.cwd();

    const addMock = jest.fn().mockReturnValue('done');
    ignore.mockImplementation(() => ({
      add: addMock,
    }));
    fs.readFileSync.mockReturnValue('ignore content');

    const actual = getIgnorer(cwd, ignorePath);

    expect(addMock).toHaveBeenCalledTimes(1);
    expect(addMock).toHaveBeenCalledWith('ignore content');

    expect(actual).toStrictEqual('done');
  });

  test('ignore file passed (absolute) and found', () => {
    const ignorePath = '/home/fixtures/ignorePath/.gitignore-example';
    const cwd = process.cwd();

    const addMock = jest.fn().mockReturnValue('done');
    ignore.mockImplementation(() => ({
      add: addMock,
    }));
    fs.readFileSync.mockReturnValue('ignore content');

    const actual = getIgnorer(cwd, ignorePath);

    expect(addMock).toHaveBeenCalledTimes(1);
    expect(addMock).toHaveBeenCalledWith('ignore content');

    expect(actual).toStrictEqual('done');
  });

  test('ignore file not passed and not found', () => {
    let ignorePath;
    const cwd = process.cwd();

    fs.readFileSync.mockImplementation(() => {
      const error = new Error('Failed to read config file: missing.json. \nError: Error');

      error.code = 'ENOENT';
      throw error;
    });

    expect(() => {
      getIgnorer(cwd, ignorePath);
    }).toThrow('');

    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('/.npmpackagejsonlintignore'), 'utf8');
  });
});
