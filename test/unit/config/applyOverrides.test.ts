import {applyOverrides} from '../../../src/config/applyOverrides';

describe('applyOverrides Unit Tests', () => {
  const cwd = '/project';

  test('applies rules from all matching overrides in order', () => {
    const filePath = '/project/packages/config/package.json';
    const rules = {'require-name': 'error'};
    const overrides = [
      {
        patterns: ['**'],
        rules: {'require-name': 'off'},
      },
      {
        patterns: ['packages/config'],
        rules: {'require-name': 'warning'},
      },
    ];

    const result = applyOverrides(cwd, filePath, rules, overrides);

    expect(result).toStrictEqual({'require-name': 'warning'});
  });

  test('keeps original rules when no pattern matches', () => {
    const filePath = '/project/apps/api/package.json';
    const rules = {'require-name': 'error'};
    const overrides = [
      {
        patterns: ['packages/config'],
        rules: {'require-name': 'warning'},
      },
    ];

    const result = applyOverrides(cwd, filePath, rules, overrides);

    expect(result).toStrictEqual({'require-name': 'error'});
  });

  test('no overrides', () => {
    const filePath = '/project/packages/config/package.json';
    const rules = {'require-name': 'error'};

    const result = applyOverrides(cwd, filePath, rules);

    expect(result).toStrictEqual({'require-name': 'error'});
  });

  test('matches root package.json via ./ pattern', () => {
    const filePath = '/project/package.json';
    const rules = {'require-main': 'error'};
    const overrides = [
      {
        patterns: ['./package.json'],
        rules: {'require-main': 'off'},
      },
    ];

    const result = applyOverrides(cwd, filePath, rules, overrides);

    expect(result).toStrictEqual({'require-main': 'off'});
  });

  test('skips empty patterns', () => {
    const filePath = '/project/packages/config/package.json';
    const rules = {'require-name': 'error'};
    const overrides = [
      {
        patterns: ['', 'packages/config'],
        rules: {'require-name': 'warning'},
      },
    ];

    const result = applyOverrides(cwd, filePath, rules, overrides);

    expect(result).toStrictEqual({'require-name': 'warning'});
  });
});
