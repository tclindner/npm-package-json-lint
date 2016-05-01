"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/repository-type").lint;

describe("repository-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        repository: true
      };
      const response = lint(packageJsonData);

      response.lintId.should.equal("repository-type");
      response.lintType.should.equal("error");
      response.node.should.equal("repository");
      response.lintMessage.should.equal("Type should be either a string or an Object");
    });
  });

  context("when package.json does not have node", function() {
    it("true should be returned", function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });
});
