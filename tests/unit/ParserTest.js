"use strict";

let fs = require("fs");
let should = require("should");
let sinon = require("sinon");
let requireHelper = require("../require_helper");
let Parser = requireHelper("Parser");

describe("Parser Unit Tests", function() {
  describe("parse method", function() {
    context("when file is present", function() {
      it("the parse should run fine", function() {
        let packageJson = {
          name: "Marcel the Shell with Shoes On"
        };

        let parser = new Parser();
        let stub = sinon.stub(parser, "_readFile").returns(packageJson);

        parser.parse("package.json").should.equal(packageJson);
        parser._readFile.restore();
      });
    });

    context("when file is not present", function() {
      it("an error should be thrown", function() {
        let parser = new Parser();
        let stub = sinon.stub(parser, "_readFile").throws();

        (function() {
          parser.parse("missing.json");
        }).should.throw("missing.json does not exist :(");
        parser._readFile.restore();
      });
    });
  });

  describe("_readFile method", function() {
    context("when reading a JSON file", function() {
      it("an object should be returned", function() {
        let json = '{"key": "value"}';
        let obj = {
          key: "value"
        };

        let parser = new Parser();
        let stub = sinon.stub(fs, "readFileSync").returns(json);

        parser._readFile("dummyFile.txt").should.eql(obj);
        fs.readFileSync.restore();
      });
    });
  });
});
