"use strict";

/* eslint max-nested-callbacks: "off" */

const chalk = require("chalk");
const LintIssue = require("../../src/LintIssue");
const should = require("should");
const sinon = require("sinon");
const requireHelper = require("../require_helper");
const Reporter = requireHelper("Reporter");

describe("Reporter Unit Tests", function() {
  describe("write method", function() {
    context("when an array is passed", function() {
      const reporter = new Reporter();
      const error = "doh, I am an error";
      let spy;

      beforeEach(function() {
        spy = sinon.spy(console, "log");
      });

      afterEach(function() {
        console.log.restore();
      });

      it("with an array with zero errors is passed a formatted message should be returned saying there are no errors", function() {
        const errors = [];
        const errorCount = 1;
        const output = chalk.green.bold("\nNo errors found!");

        reporter.write(errors, "errors");
        spy.withArgs(output).calledOnce.should.be.true();
      });

      it("when an array with one error is passed a formatted message should be returned saying there is one error", function() {
        const errors = [];
        const errorCount = 1;
        const formattedErrorCount = chalk.red.bold(errorCount);
        const output = `\n${formattedErrorCount} errors found.`;

        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));

        reporter.write(errors, "errors");
        spy.calledThrice.should.be.true();
        spy.thirdCall.calledWithExactly(output).should.be.true();
      });

      it("when an array with twos errors are passed a formatted message should be returned saying there are two errors", function() {
        const errors = [];
        const errorCount = 2;
        const formattedErrorCount = chalk.red.bold(errorCount);
        const output = `\n${formattedErrorCount} errors found.`;
        const writeMethodCallCount = 4;

        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));
        errors.push(new LintIssue("Lint ID", "lintType", "node", "lintMessage"));

        reporter.write(errors, "errors");
        spy.callCount.should.equal(writeMethodCallCount);
        spy.lastCall.calledWithExactly(output).should.be.true();
      });
    });
  });
});
