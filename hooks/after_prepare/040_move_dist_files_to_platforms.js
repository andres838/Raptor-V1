#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var path = require('path');
var fs = require('fs-extra');
var options = {clobber: true};

var iosFiles = [
  {
    name: 'css',
    from: path.resolve(__dirname, '../../dist/css'),
    to: path.resolve(__dirname, '../../platforms/ios/www/css'),
  },
  {
    name: 'js',
    from: path.resolve(__dirname, '../../dist/app'),
    to: path.resolve(__dirname, '../../platforms/ios/www/app'),
  },
  {
    name: 'index',
    from: path.resolve(__dirname, '../../dist/index.html'),
    to: path.resolve(__dirname, '../../platforms/ios/www/index.html'),
  }
];

var androidFiles = [
  {
    name: 'css',
    from: path.resolve(__dirname, '../../dist/css'),
    to: path.resolve(__dirname, '../../platforms/android/assets/www/css')
  },
  {
    name: 'js',
    from: path.resolve(__dirname, '../../dist/app'),
    to: path.resolve(__dirname, '../../platforms/android/assets/www/app'),
  },
  {
    name: 'index',
    from: path.resolve(__dirname, '../../dist/index.html'),
    to: path.resolve(__dirname, '../../platforms/android/assets/www/index.html'),
  }
];

var filesByPlatform = {
  'ios': iosFiles,
  'android': androidFiles
}

for(var platform in filesByPlatform) {
  console.log("Copying dist files to "+platform+" platform");
  var files = filesByPlatform[platform];
  for(var k in files) {
    var file = files[k];
    try {
      fs.copySync(file.from, file.to, options)
      console.log(file.name+" copied OK to "+platform+" platform");
    } catch (err) {
      console.error(err)
      console.log("ERROR when copying "+file.name+" to "+platform+" platform");
    }
  }
}
