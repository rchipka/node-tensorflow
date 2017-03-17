'use strict';

var fs    = require('fs'),
    path  = require('path'),
    mocha = require('mocha'),
    LIB_TEST_PATH = path.resolve(__dirname, '../test'),
    CONTRIB_PATH  = path.resolve(__dirname, '../contrib/test');

[LIB_TEST_PATH, CONTRIB_PATH].forEach(function (dir) {
  fs.readdirSync(dir)
    .filter(function(file) {
      return path.extname(file) === '.js';
    })
    .forEach(function(file) {
      mocha.addFile(path.resolve(dir, file));
    });
});

mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures);
  });
});
