var createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;

module.exports = function (grunt) {
  grunt.registerMultiTask('create-windows-installer', 'Create the Windows installer', function () {
    this.requiresConfig(this.name + '.' + this.target + '.appDirectory');

    var config = grunt.config(this.name + '.' + this.target);
    var done = this.async();
    createWindowsInstaller(config).then(done, done);
  });
};
