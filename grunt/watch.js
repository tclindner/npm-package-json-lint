module.exports = function(grunt) {
  grunt.config.set("watch", {
    json: {
      files: [
        "**/*.json"
      ],
      tasks: [
        "jsonlint"
      ]
    },
    js: {
      files: [
        "src/**/*.js",
        "tests/**/*.js"
      ],
      tasks: [
        "jshint",
        "jscs",
        "mochaTest:local"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
};
