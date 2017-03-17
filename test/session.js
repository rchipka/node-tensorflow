'use strict';

var tf     = require('../'),
    assert = require('assert');

describe('Session', function () {
  describe('#Constructor', function () {
    it('should work without arguments', function () {
      var session = new tf.Session();
      assert.ok(session instanceof tf.Session);
      assert.equal(session.instance.toString(), '[object SwigProxy]');
    });

    it('should work with Graph', function () {
      var graph   = new tf.Graph(),
          session = new tf.Session(graph);

      assert.ok(session instanceof tf.Session);
      assert.strictEqual(session.graph, graph);
    });
  });
});
