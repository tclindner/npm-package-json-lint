module.exports = function(grunt) {

  grunt.config("jshint", {
    options: {
      reporter: require("jshint-stylish"),
      jshintrc: ".jshintrc"
    },
    all: [
      "src/**/*.js",
      "grunt/*.js",
      "tests/unit/**/*.js",
      "*.js"
    ]
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
};
