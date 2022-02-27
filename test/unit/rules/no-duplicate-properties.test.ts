import {lint, ruleType} from '../../../src/rules/no-duplicate-properties';
import {sourceSymbol} from '../../../src/file-parser';
import {Severity} from '../../../src/types/severity';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const parsePackageJson = (source) => {
  const json = JSON.parse(source);

  json[sourceSymbol] = source;

  return json;
};

describe('no-duplicate-properties Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when package.json has duplicate properties', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package1",
        "name": "package2"
      }`);
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('no-duplicate-properties');
      expect(response.severity).toStrictEqual('error');
      expect(response.lintMessage).toStrictEqual('Duplicate properties detected. Please remove duplicates for: name.');
    });
  });

  describe('when package.json has nested duplicate properties', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package",
        "devDependencies": {
          "eslint": "6.7.2",
          "eslint-config-tc": "9.0.0",
          "eslint": "6.7.2"
        }
      }`);
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('no-duplicate-properties');
      expect(response.severity).toStrictEqual('error');
      expect(response.lintMessage).toStrictEqual('Duplicate properties detected. Please remove duplicates for: eslint.');
    });
  });

  describe('when package.json without duplicates', () => {
    test('true should be returned', () => {
      const packageJsonData = parsePackageJson(`{
        "name": "package1",
        "version": "0.1.0"
      }`);
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });
});
