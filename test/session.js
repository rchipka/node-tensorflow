'use strict';

var tf     = require('../'),
    assert = require('assert');

describe('Session', function () {
  describe('#Constructor', function () {
    var graph   = new tf.Graph(),
        options = new tf.SessionOptions();

    it('should work without arguments', function () {
      var session = new tf.Session();

      assert.ok(session instanceof tf.Session);
      assert.equal(session.instance.toString(), '[object SwigProxy]');
    });

    it('should work with just Graph', function () {
      var session = new tf.Session(graph);

      assert.ok(session instanceof tf.Session);
      assert.ok(session.options instanceof tf.SessionOptions);
      assert.strictEqual(session.graph, graph);
    });

    it('should work with just SessionOptions', function () {
      var session = new tf.Session(options);

      assert.ok(session instanceof tf.Session);
      assert.ok(session.graph instanceof tf.Graph);
      assert.ok(options.instance.equals(session.options.instance));
    });

    it('should work with both Graph and SessionOptions', function () {
      var session = new tf.Session(graph, options);

      assert.ok(session instanceof tf.Session);
      assert.ok(session.graph.instance.equals(graph.instance));
      assert.ok(session.options.instance.equals(options.instance));
    });
  });
});
