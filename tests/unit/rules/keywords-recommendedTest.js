"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/keywords-recommended").lint;

describe("keywords-recommended Unit Tests", function() {
  context("when package.json has node", function() {
    it("true should be returned", function() {
      const packageJsonData = {
        keywords: "keywords"
      };
      const response = lint(packageJsonData);

      response.should.be.true();
    });
  });

  context("when package.json does not have node", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {};
      const response = lint(packageJsonData);

      response.lintId.should.equal("keywords-recommended");
      response.lintType.should.equal("warning");
      response.node.should.equal("keywords");
      response.lintMessage.should.equal("keywords is recommended");
    });
  });
});
