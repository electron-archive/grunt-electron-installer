path = require 'path'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    shell:
      test:
        command: "node #{path.join('node_modules', 'jasmine-focused', 'bin', 'jasmine-focused')} --captureExceptions spec"
        options:
          stdout: true
          stderr: true
          failOnError: true

  grunt.loadNpmTasks('grunt-shell')
  grunt.registerTask('test', ['default', 'shell:test'])
