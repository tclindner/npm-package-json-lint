const path = require('path');
const globby = require('globby');
const applyOverrides = require('../../../src/config/applyOverrides');

jest.mock('globby');
jest.mock('path');

describe('applyOverrides Unit Tests', () => {
  test('pattern match', () => {
    const cwd = process.cwd();
    const filePath = './package.json';
    const rules = {
      'require-name': 'error'
    };
    const overrides = [
      {
        patterns: ['**'],
        rules: {
          'require-name': 'off'
        }
      },
      {
        patterns: ['*/package.json'],
        rules: {
          'require-name': 'warning'
        }
      }
    ];

    globby.sync.mockReturnValue(['./package.json']);
    path.resolve.mockReturnValue('./package.json');

    const results = applyOverrides(cwd, filePath, rules, overrides);

    expect(results).toStrictEqual({
      'require-name': 'warning'
    });
  });

  test('pattern miss', () => {
    const cwd = process.cwd();
    const filePath = './test/package.json';
    const rules = {
      'require-name': 'error'
    };
    const overrides = [
      {
        patterns: ['**'],
        rules: {
          'require-name': 'off'
        }
      },
      {
        patterns: ['*/package.json'],
        rules: {
          'require-name': 'warning'
        }
      }
    ];

    globby.sync.mockReturnValue(['./package.json']);
    path.resolve.mockReturnValue('./package.json');

    const results = applyOverrides(cwd, filePath, rules, overrides);

    expect(results).toStrictEqual({
      'require-name': 'error'
    });
  });

  test('no overrides', () => {
    const cwd = process.cwd();
    const filePath = './test/package.json';
    const rules = {
      'require-name': 'error'
    };
    const results = applyOverrides(cwd, filePath, rules);

    expect(results).toStrictEqual({
      'require-name': 'error'
    });
  });
});
