'use strict';

module.exports = function (bindings) {
  var Graph = bindings.Graph = function Graph() {
    this.instance = new bindings.TF_NewGraph();
  }

  Graph.prototype = Object.create(bindings.OperationTarget);
};
