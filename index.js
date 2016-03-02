{createWindowsInstaller} = require('electron-winstaller')

module.exports = (grunt) ->
  grunt.registerMultiTask 'create-windows-installer', 'Create the Windows installer', ->
    @requiresConfig("#{@name}.#{@target}.appDirectory")
    config = grunt.config("#{@name}.#{@target}")
    done = @async()
  
    createWindowsInstaller(config).then(done, done)
