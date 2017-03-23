'use strict';

module.exports = function (bindings) {
  var Session = bindings.Session = function Session(graph, options) {
    if (graph instanceof bindings.Graph) {
      this.graph = graph;
    } else {
      if (graph !== undefined && options === undefined) {
        this.options = graph;
      }

      this.graph = new bindings.Graph();
    }

    if (options instanceof bindings.SessionOptions) {
      this.options = options;
    } else if (!(this.options instanceof bindings.SessionOptions)) {
      this.options = new bindings.SessionOptions(this.options);
    }

    this.instance =
      new bindings.CSession(this.graph.instance);
  }

  Session.prototype.run = function () {
    this.instance.Run();
  }
};
