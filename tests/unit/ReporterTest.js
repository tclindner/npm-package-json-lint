"use strict";

let chalk = require("chalk");
let LintIssue = require("../../src/LintIssue");
let should = require("should");
let sinon = require("sinon");
let requireHelper = require("../require_helper");
let Reporter = requireHelper("Reporter");

describe("Reporter Unit Tests", function() {
  describe("write method", function() {
    context("when an array is passed", function() {
      let reporter = new Reporter();
      let error = "doh, I am an error";
      let spy;

      beforeEach(function() {
        spy = sinon.spy(console, "log");
      });

      afterEach(function() {
        console.log.restore();
      });

      it("with an array with zero errors is passed a formatted message should be returned saying there are no errors", function() {
        let errors = [];
        let output = "\n" + chalk.green.bold("No errors found!");
        reporter.write(errors, "errors");
        spy.withArgs(output).calledOnce.should.be.true();
      });

      it("when an array with one error is passed a formatted message should be returned saying there is one error", function() {
        let errors = [];
        let output = "\n" + chalk.red.bold(1) + " errors found.";

        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));

        let reporter = new Reporter();
        reporter.write(errors, "errors");
        spy.calledThrice.should.be.true();
        spy.thirdCall.calledWithExactly(output).should.be.true();
      });

      it("when an array with twos errors are passed a formatted message should be returned saying there are two errors", function() {
        let errors = [];

        let output = "\n" + chalk.red.bold(2) + " errors found.";

        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));
        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));

        let reporter = new Reporter();
        reporter.write(errors, "errors");
        spy.callCount.should.equal(4);
        spy.lastCall.calledWithExactly(output).should.be.true();
      });
    });
  });
});
