const ruleModule = require('./../../../src/rules/no-dup-fields');
const Parser = require('../../../src/Parser');

const {lint, ruleType} = ruleModule;

const parsePackageJson = source => {
  const json = JSON.parse(source);

  json[Parser.sourceSymbol] = source;

  return json;
};

describe('no-dup-fields Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "optionalObject"', () => {
      expect(ruleType).toStrictEqual('optionalObject');
    });
  });

  describe('when package.json has duplicate fields', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package1",
        "name": "package2"
      }`);
      const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

      expect(response.lintId).toStrictEqual('no-duplicate-fields');
      expect(response.severity).toStrictEqual('error');
      expect(response.lintMessage).toStrictEqual('You have duplicate field names: name. Please remove duplicates.');
    });
  });

  describe('when package.json has nested duplicate fields', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package",
        "devDependencies": {
          "eslint": "6.7.2",
          "eslint-config-tc": "9.0.0",
          "eslint": "6.7.2"
        }
      }`);
      const response = lint(packageJsonData, 'error', {exceptions: ['grunt-npm-package-json-lint']});

      expect(response.lintId).toStrictEqual('no-duplicate-fields');
      expect(response.severity).toStrictEqual('error');
      expect(response.lintMessage).toStrictEqual('You have duplicate field names: eslint. Please remove duplicates.');
    });
  });

  describe('when package.json without duplicates', () => {
    test('true should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package1",
        "version": "0.1.0"
      }`);
      const response = lint(packageJsonData, 'error');

      expect(response).toBe(true);
    });
  });
});
