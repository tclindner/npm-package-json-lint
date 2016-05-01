"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/license-type").lint;

describe("license-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        license: true
      };
      const response = lint(packageJsonData);

      response.lintId.should.equal("license-type");
      response.lintType.should.equal("error");
      response.node.should.equal("license");
      response.lintMessage.should.equal("Type should be a string");
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
