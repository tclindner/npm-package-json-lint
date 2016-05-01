"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/files-type").lint;

describe("files-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        files: "string"
      };
      const response = lint(packageJsonData);

      response.lintId.should.equal("files-type");
      response.lintType.should.equal("error");
      response.node.should.equal("files");
      response.lintMessage.should.equal("Type should be an Array");
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
