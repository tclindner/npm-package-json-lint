import {lint, ruleType} from '../../../src/rules/prefer-provenance';
import {Severity} from '../../../src/types/severity';

describe('prefer-provenance Unit Tests', () => {
  describe('a rule type value should be exported', () => {
    test('it should equal "standard"', () => {
      expect(ruleType).toStrictEqual('standard');
    });
  });

  describe('when private is true', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        private: true,
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when private is not true and provenance is true', () => {
    test('true should be returned', () => {
      const packageJsonData = {
        publishConfig: {
          provenance: true,
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response).toBeNull();
    });
  });

  describe('when private is not true and publishConfig is missing', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {};
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-provenance');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig.provenance');
      expect(response.lintMessage).toStrictEqual('publishConfig.provenance should be true unless private is true');
    });
  });

  describe('when private is not true and provenance is false', () => {
    test('LintIssue object should be returned', () => {
      const packageJsonData = {
        private: false,
        publishConfig: {
          provenance: false,
        },
      };
      const response = lint(packageJsonData, Severity.Error);

      expect(response.lintId).toStrictEqual('prefer-provenance');
      expect(response.severity).toStrictEqual('error');
      expect(response.node).toStrictEqual('publishConfig.provenance');
      expect(response.lintMessage).toStrictEqual('publishConfig.provenance should be true unless private is true');
    });
  });
});
