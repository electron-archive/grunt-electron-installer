_ = require 'underscore'
windowsInstaller = require 'electron-winstaller'

module.exports = (grunt) ->

  grunt.registerMultiTask 'create-windows-installer', 'Create the Windows installer', ->
    @requiresConfig("#{@name}.#{@target}.appDirectory")

    done = @async()

    config = _.clone grunt.config("#{@name}.#{@target}")

    config.log =
      debug: (msg) -> grunt.verbose.ok msg
      info: (msg) -> grunt.verbose.ok msg
      warn: (msg) -> grunt.fail.warn msg
      error: (msg) -> grunt.log.error msg

    windowsInstaller.build(config, done)

module.exports.convertVersion = windowsInstaller.convertVersion
