'use strict';

module.exports = function (bindings) {
  var Session = bindings.Session = function Session(graph, options) {
    if (graph instanceof bindings.Graph) {
      this.graph = graph;
    } else {
      if (graph !== undefined && options === undefined) {
        this.options = new bindings.SessionOptions(graph);
      }

      this.graph = new bindings.Graph();
    }

    if (options instanceof bindings.SessionOptions) {
      this.options = options;
    } else {
      this.options = new bindings.SessionOptions(options);
    }

    this.instance =
      new bindings.TF_NewSession(
        this.graph.instance, this.options.instance, this.graph.status);
  }
};
