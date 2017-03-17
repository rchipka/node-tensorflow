'use strict';

var fs       = require('fs'),
    path     = require('path'),
    bindings = require('bindings')('tensorflow'),
    CONTRIB_PATH = path.resolve(__dirname, 'contrib');

// bindings = Object.create(bindings);
require('./lib/Graph.js')(bindings);
require('./lib/Session.js')(bindings);
require('./lib/SessionOptions.js')(bindings);
require('./lib/Operation.js')(bindings);

fs.readdirSync(CONTRIB_PATH)
  .filter(function (file) {
    return path.extname(file) === '.js';
  })
  .forEach(function (file) {
    require(path.resolve(CONTRIB_PATH, file))(bindings);
  });

module.exports = bindings;
