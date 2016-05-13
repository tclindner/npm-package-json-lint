// Monitor files for changes and run tasks
module.exports = function(grunt) {
  grunt.config.set('watch', {
    json: {
      files: [
        '**/*.json'
      ],
      tasks: [
        'jsonlint'
      ]
    },
    javascript: {
      files: [
        'src/**/*.js',
        'tests/**/*.js'
      ],
      tasks: [
        'lint',
        'mochaTest:local'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
