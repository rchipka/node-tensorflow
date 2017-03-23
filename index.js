'use strict';

var fs       = require('fs'),
    path     = require('path'),
    bindings = require('bindings')('tensorflow'),
    CONTRIB_PATH = path.resolve(__dirname, 'contrib');

    var SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler("crash.log");

bindings = Object.create(bindings);
require('./lib/types.js')(bindings);
require('./lib/Operation.js')(bindings);
require('./lib/OperationDescription.js')(bindings);
require('./lib/Graph.js')(bindings);
require('./lib/Session.js')(bindings);
require('./lib/SessionOptions.js')(bindings);


// console.log(bindings);


// console.log('Press any key to continue');
//
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.on('data', function () {
var g = new bindings.Graph(),
    s = new bindings.Session(g);

var p = s.graph.placeholder().name('test').shape([1]);
console.log(p.instance);
// console.log("S", bindings.TF_GraphGetTensorNumDims(s.graph.instance, p.instance));

s.instance.SetTargets([p.finish(s.graph)]);

s.run();
// });


fs.readdirSync(CONTRIB_PATH)
  .filter(function (file) {
    return path.extname(file) === '.js';
  })
  .forEach(function (file) {
    require(path.resolve(CONTRIB_PATH, file))(bindings);
  });

module.exports = bindings;
