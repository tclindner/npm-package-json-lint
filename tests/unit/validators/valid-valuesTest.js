"use strict";

let should = require("should");
let requireHelper = require("../../require_helper");
let validValuesObj = requireHelper("validators/valid-values");

describe("value-values Unit Tests", function() {
  describe("isValidValue method", function() {
    let packageJson = {
      author: "Malcolm Reynolds"
    };

    context("when the node doesn't exist in the package.json file", function() {
      it("false should be returned", function() {
        let validValues = [
          "Zoe Washburn",
          "Hoban Washburn",
          "Inara Serra",
          "Jayne Cobb",
          "Kaylee Frye",
          "Simon Tam",
          "River Tam"
        ];
        let response = validValuesObj.isValidValue(packageJson, "authors", validValues);
        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file and the value is valid", function() {
      it("true should be returned", function() {
        let validValues = [
          "Malcolm Reynolds",
          "Zoe Washburn",
          "Hoban Washburn",
          "Inara Serra",
          "Jayne Cobb",
          "Kaylee Frye",
          "Simon Tam",
          "River Tam"
        ];
        let response = validValuesObj.isValidValue(packageJson, "author", validValues);
        response.should.be.true();
      });
    });

    context("when the node exists in the package.json file, but the value is invalid", function() {
      it("false should be returned", function() {
        let validValues = [
          "Zoe Washburn",
          "Hoban Washburn",
          "Inara Serra",
          "Jayne Cobb",
          "Kaylee Frye",
          "Simon Tam",
          "River Tam"
        ];
        let response = validValuesObj.isValidValue(packageJson, "author", validValues);
        response.should.be.false();
      });
    });
  });
});
