/**
 * Mocha test runner
 */
module.exports = function(grunt) {

  grunt.config("mochaTest", {
    local: {
      options: {
        reporter: "spec"
      },
      src: ["tests/unit/**/*.js"]
    }
  });

  grunt.loadNpmTasks("grunt-mocha-test");
};
