// Cleans the dist directory (deletes all files)
module.exports = function(grunt) {

  grunt.config("clean", {
    coverage: {
      src: ["tests/coverage/"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
};
