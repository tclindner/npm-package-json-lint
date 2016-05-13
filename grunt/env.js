module.exports = function(grunt) {

  grunt.config('env', {
    coverage: {
      SRC_DIR_FOR_CODE_COV: '../tests/coverage/instrument/src/'
    }
  });

  grunt.loadNpmTasks('grunt-env');
};
