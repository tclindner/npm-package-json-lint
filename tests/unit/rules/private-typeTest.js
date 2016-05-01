"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/private-type").lint;

describe("private-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        private: "string"
      };
      let response = lint(packageJsonData);

      response.lintId.should.equal("private-type");
      response.lintType.should.equal("error");
      response.node.should.equal("private");
      response.lintMessage.should.equal("Type should be a boolean");
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
