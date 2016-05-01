module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    eslint: {
      target: ['./controllers', './routes', './validation', './app.js', './index.js', './spec']
    }

  });

  grunt.registerTask('default', ['eslint']);

}
