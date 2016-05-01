"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/author-valid-values").lint;

describe("author-valid-values Unit Tests", function() {
  context("when package.json has node with invalid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        author: "LastName, FirstName"
      };
      let validValues = [
        "FirstName LastName",
        "FirstName MiddleName LastName"
      ];
      let response = lint(packageJsonData, validValues);

      response.lintId.should.equal("author-valid-values");
      response.lintType.should.equal("error");
      response.node.should.equal("author");
      response.lintMessage.should.equal("Invalid value for author");
    });
  });

  context("when package.json has node with valid value", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        author: "LastName, FirstName"
      };
      let validValues = [
        "FirstName LastName",
        "FirstName MiddleName LastName",
        "LastName, FirstName"
      ];
      let response = lint(packageJsonData, validValues);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      let packageJsonData = {};
      let validValues = [
        "FirstName LastName",
        "FirstName MiddleName LastName",
        "LastName, FirstName"
      ];
      let response = lint(packageJsonData, validValues);

      response.should.be.true();
    });
  });
});
