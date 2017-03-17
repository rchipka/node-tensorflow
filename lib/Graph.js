'use strict';

module.exports = function (bindings) {
  bindings.Graph = function Graph() {
    this.status   = new bindings.TF_NewStatus();
    this.instance = new bindings.TF_NewGraph();
  }
};
