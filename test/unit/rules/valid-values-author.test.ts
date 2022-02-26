import {lint, ruleType, minItems} from '../../../src/rules/valid-values-author');

describe('valid-values-author Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "array"', () => {
      expect(ruleType).toStrictEqual('array');
    });
  });

  describe('a minItems value should be exported', () => {
    test('it should equal 1', () => {
      expect(minItems).toStrictEqual(1);
    });
  });

  describe('when package.json has string node with invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: 'LastName, FirstName',
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('Invalid value for author');
    });
  });

  describe('when package.json has string node with valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: 'LastName, FirstName',
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName', 'LastName, FirstName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
    });
  });

  describe('when package.json has object node with invalid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com',
        },
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('Invalid value for author');
    });
  });

  describe('when package.json has object node with valid value', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: {
          name: 'LastName, FirstName',
          url: 'http://www.example.com',
        },
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName', 'LastName, FirstName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
    });
  });

  describe('when package.json has object node but is missing the name property', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: {
          names: 'LastName, FirstName',
          url: 'http://www.example.com',
        },
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('author object missing name property');
    });
  });

  describe('when package.json has node but is invalid type', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        author: true,
      };
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response.lintId).toStrictEqual('valid-values-author');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('author');
      expect(response.lintMessage).toStrictEqual('author node has invalid data type');
    });
  });

  describe('when package.json does not have node', () => {
    test('true should be returned', () => {
      const packageJsonData = {};
      const validValues = ['FirstName LastName', 'FirstName MiddleName LastName', 'LastName, FirstName'];
      const response = lint(packageJsonData, 'error', validValues);

      expect(response).toBe(true);
    });
  });
});
