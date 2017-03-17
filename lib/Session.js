'use strict';

module.exports = function (bindings) {
  bindings.Session = function Session(graph, options) {
    this.instance = new tf.TF_NewSession(graph.instance, options, graph.status);
  }
};
