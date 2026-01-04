const ruleModule = require('../../../src/rules/exports-valid');

const {lint, ruleType} = ruleModule;

describe('exports-valid Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has invalid node', () => {
    const invalids = [
      {
        title: 'root is `true`',
        input: true,
        message: 'unexpected `boolean`',
      },
      {
        title: 'root is a number',
        input: 4,
        message: 'unexpected `number`',
      },
      {
        title: 'key is `/`',
        input: {'/': 'foo.js'},
        message: 'condition `/` not in supported conditions `default`',
      },
      {
        title: 'key starts with `/`',
        input: {'/foo': 'foo.js'},
        message: 'condition `/foo` not in supported conditions `default`',
      },
      {
        title: 'key is short relative path',
        input: {foo: 'foo.js'},
        message: 'condition `foo` not in supported conditions `default`',
      },
      {
        title: 'main-only sugar path starts with `/`',
        input: '/main.js',
        message: 'invalid path `/main.js` must start with `./`',
      },
      {
        title: 'main-only sugar path short form relative',
        input: 'main.js',
        message: 'invalid path `main.js` must start with `./`',
      },
      {
        title: 'short form relative path',
        input: {'./a': 'a.js'},
        message: 'invalid path `a.js` must start with `./`',
      },
      {
        title: 'unsupported condition',
        config: {conditions: ['foo']},
        input: {bar: './main.js'},
        message: 'condition `bar` not in supported conditions `foo,default`',
      },
      {
        title: 'folder mapped to file',
        input: {'./': './a.js'},
        message: 'the value of the folder mapping key `./` must end with `/`',
      },
      {
        title: 'path key in conditions object',
        config: {conditions: ['foo']},
        input: {foo: './foo.js', './a': './a.js'},
        message: 'found path key `./a` in a conditions object',
      },
      {
        title: 'condition key in paths object',
        config: {conditions: ['foo']},
        input: {'./a': './a.js', foo: './foo.js'},
        message: 'found condition key `foo` in a paths object',
      },
      {
        title: '`default` condition not last',
        config: {conditions: ['foo']},
        input: {default: './a.js', foo: './b.js'},
        message: 'condition `default` must be the last key',
      },
      {
        title: 'some error in nested conditions',
        config: {conditions: ['node']},
        input: {node: {foo: './a.js'}},
        message: 'condition `foo` not in supported conditions `node,default`',
      },
      {
        title: 'two valid values in fallback array',
        input: {'./a': ['invalid', './a.js', './b.js']},
        message: 'fallback array has multiple valid paths',
      },
      {
        title: 'empty fallback array',
        input: {'./a': []},
        message: 'empty fallback array',
      },
      {
        title: 'no invalid value in fallback array',
        input: {'./a': ['./a.js']},
        message: 'fallback array has no invalid values',
      },
      {
        title: 'no valid path in fallback array',
        input: {'./a': ['invalid-a', 'invalid-b']},
        message: 'fallback array has no valid path',
      },
      {
        title: 'valid path followed by invalid value',
        input: {'./a': ['./a.js', 'invalid']},
        message: 'found invalid value following a valid path',
      },
      {
        title: 'conditions in fallback array',
        input: {'./a': ['invalid-a', {node: './node.js'}, './a.js']},
        message: 'fallback array must have only strings',
      },
      {
        title: 'nested fallback array',
        input: {'./a': ['invalid-a', ['invalid', './b.js'], './a.js']},
        message: 'fallback array must have only strings',
      },
      {
        title: 'nested paths object',
        input: {'./a': {'./b': './b.js'}},
        message: 'key `./a` has paths object vaule but only conditions may be nested',
      },
    ];
    invalids.forEach(({title, config, input, message}) => {
      // eslint-disable-next-line jest/valid-title
      test(title, () => {
        const response = lint({exports: input}, 'error', config);

        expect(response).not.toStrictEqual(true);
        expect(response.lintId).toStrictEqual('exports-valid');
        expect(response.severity).toStrictEqual('error');
        expect(response.node).toStrictEqual('exports');
        expect(response.lintMessage).toStrictEqual(message);
      });
    });
  });

  describe('when package.json has valid node', () => {
    const valids = [
      {
        title: 'empty config object',
        config: {},
        input: {},
      },
      {
        title: 'empty exports',
        input: {},
      },
      {
        title: 'a valid key',
        input: {'./a': './a.js'},
      },
      {
        title: 'multiple valid keys',
        input: {'./a': './a.js', './b': './b.js'},
      },
      {
        title: 'a valid key with slashes',
        input: {'./a/b': './a/b.js'},
      },
      {
        title: 'a valid key with file extension',
        input: {'./a.js': './a.js'},
      },
      {
        title: 'main-only sugar',
        input: './main.js',
      },
      {
        title: 'a valid path',
        input: {'./a': './a.js'},
      },
      {
        title: 'a valid path in sub-directory',
        input: {'./a': './a/b.js'},
      },
      {
        title: 'supported condition',
        config: {conditions: ['foo']},
        input: {foo: './main.js'},
      },
      {
        title: 'multiple supported conditions',
        config: {conditions: ['foo', 'bar']},
        input: {foo: './main.js', bar: './bar.js'},
      },
      {
        title: 'default condition',
        config: {conditions: ['a', 'default']},
        input: {a: './main.js', default: './bar.js'},
      },
      {
        title: 'folder mapping',
        input: {'./': './a/'},
      },
      {
        title: 'sub-folder mapping',
        input: {'./a/': './a/b/'},
      },
      {
        title: 'fallback array',
        input: {'./a': ['invalid', './a.js']},
      },
      {
        title: 'fallback array with two invalids',
        input: {'./a': ['invalid-a', 'invalid-b', './a.js']},
      },
      {
        title: 'conditions under path',
        config: {conditions: ['node']},
        input: {'./a': {node: './node.js', default: './a.js'}},
      },
      {
        title: 'nested conditions under path',
        config: {conditions: ['node', 'import', 'require']},
        input: {'./a': {node: {import: './node.mjs', require: './node.cjs'}, default: './a.js'}},
      },
    ];
    valids.forEach(({title, input, config}) => {
      // eslint-disable-next-line jest/valid-title
      test(title, () => {
        const response = lint({exports: input}, 'error', config);
        expect(response).toBe(true);
      });
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
