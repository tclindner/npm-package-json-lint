/**
* Checks to ensure the test coverage meets the minimum thresholds below
*/
module.exports = function(grunt) {

  grunt.config("coverage", {
    default: {
      options: {
        thresholds: {
          statements: 100,
          branches: 98,
          lines: 100,
          functions: 100
        },
        dir: "coverage",
        root: "tests"
      }
    }
  });

  grunt.loadNpmTasks("grunt-istanbul-coverage");
};
