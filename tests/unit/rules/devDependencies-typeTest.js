"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let lint = requireHelper("rules/devDependencies-type").lint;

describe("devDependencies-type Unit Tests", function() {
  context("when package.json has node with incorrect type", function() {
    it("LintIssue object should be returned", function() {
      let packageJsonData = {
        devDependencies: "devDependencies"
      };
      let response = lint(packageJsonData);
      response.lintId.should.equal("devDependencies-type");
      response.lintType.should.equal("error");
      response.node.should.equal("devDependencies");
      response.lintMessage.should.equal("Type should be an Object");
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
