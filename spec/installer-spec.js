var fs = require('fs');
var path = require('path');
var grunt = require('grunt');
var temp = require('temp');

describe('create-windows-installer task', function () {
  beforeEach(function() {
    var updateExePath = path.join(__dirname, 'fixtures', 'app', 'Update.exe');
    if (fs.existsSync(updateExePath)) {
      fs.unlinkSync(updateExePath);
    }
  });

  it('creates a nuget package and installer', function () {
    var outputDirectory = temp.mkdirSync('grunt-electron-installer-');

    grunt.config.init({
      pkg: grunt.file.readJSON(path.join(__dirname, 'fixtures', 'app', 'resources', 'app', 'package.json')),
      'create-windows-installer': {
        config: {
          appDirectory: path.join(__dirname, 'fixtures', 'app'),
          outputDirectory: outputDirectory
        }
      }
    });

    grunt.loadTasks(path.resolve(__dirname, '..', 'tasks'));

    var tasksDone = false;
    grunt.registerTask('done', 'done', function () {
      tasksDone = true;
    });
    grunt.task.run(['create-windows-installer', 'done']).start();

    waitsFor(30000, function () {
      return tasksDone;
    });

    runs(function () {
      expect(fs.existsSync(path.join(outputDirectory, 'myapp-1.0.0-full.nupkg'))).toBe(true);
      expect(fs.existsSync(path.join(outputDirectory, 'MyAppSetup.exe'))).toBe(true);
      if (process.platform === 'win32') {
        expect(fs.existsSync(path.join(outputDirectory, 'MyAppSetup.msi'))).toBe(true);
      }
      expect(fs.existsSync(path.join(__dirname, 'fixtures', 'app', 'Update.exe'))).toBe(true);
    });
  });
});
