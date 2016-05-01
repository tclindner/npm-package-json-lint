"use strict";

const should = require("should");
const requireHelper = require("../../require_helper");
const lint = requireHelper("rules/dependencies-type").lint;

describe("dependencies-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      const packageJsonData = {
        dependencies: "dependencies"
      };
      const response = lint(packageJsonData);

      response.lintId.should.equal("dependencies-type");
      response.lintType.should.equal("error");
      response.node.should.equal("dependencies");
      response.lintMessage.should.equal("Type should be an Object");
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
