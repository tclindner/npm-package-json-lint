"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/private-valid-values").lint;

describe("private-valid-values Unit Tests", function() {
  context("when package.json has node with incorrect format", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        private: true
      };
      let validValues = [
        false
      ];
      let response = lint(packageJsonData, validValues);
      response.lintId.should.equal("private-valid-values");
      response.lintType.should.equal("error");
      response.node.should.equal("private");
      response.lintMessage.should.equal("Invalid value for private");
    });
  });

  context("when package.json has node with correct format", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        private: false
      };
      let validValues = [
        false
      ];
      let response = lint(packageJsonData, validValues);
      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let response = lint(packageJsonData);
      response.should.be.true();
    });
  });
});
