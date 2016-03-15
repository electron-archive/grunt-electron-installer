'use strict';

const fs = require('fs');
const path = require('path');
const grunt = require('grunt');
const temp = require('temp');

describe('create-windows-installer task', function () {
  let updateExePath;
  
  beforeEach(function() {
    updateExePath = path.join(__dirname, 'fixtures', 'app', 'Update.exe');

    if (fs.existsSync(updateExePath)) {
      fs.unlinkSync(updateExePath);
    }
  });

  it('creates a nuget package and installer', function () {
    const outputDirectory = temp.mkdirSync('grunt-electron-installer-');

    function existsFileInOutput(filename) {
      return fs.existsSync(path.join(outputDirectory, filename));
    }

    grunt.config.init({
      pkg: grunt.file.readJSON(path.join(__dirname, 'fixtures', 'app', 'resources', 'app', 'package.json')),
      'create-windows-installer': {
        config: {
          appDirectory: path.join(__dirname, 'fixtures', 'app'),
          outputDirectory: outputDirectory
        }
      }
    });

    grunt.loadTasks(path.join(__dirname, '..', 'tasks'));

    let tasksDone = false;

    grunt.registerTask('done', 'done', function () {
      tasksDone = true;
    });

    grunt.task.run(['create-windows-installer', 'done']).start();

    waitsFor(30000, function () {
      return tasksDone;
    });

    runs(function () {
      expect(existsFileInOutput('myapp-1.0.0-full.nupkg')).toBe(true);
      expect(existsFileInOutput('MyAppSetup.exe')).toBe(true);

      if (process.platform === 'win32') {
        expect(existsFileInOutput('MyAppSetup.msi')).toBe(true);
      }

      expect(fs.existsSync(updateExePath)).toBe(true);
    });
  });
});
