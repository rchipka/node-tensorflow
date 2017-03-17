'use strict';

var bindings = Object.create(require('bindings')('tensorflow'));

require('lib/Graph.js')(bindings);
require('lib/Session.js')(bindings);
require('lib/Operation.js')(bindings);

module.exports = bindings;
