'use strict';

module.exports = function (bindings) {
  var SessionOptions =
      bindings.SessionOptions =
      function SessionOptions(options) {
    this.opts =options;
    this.instance =
      new bindings.TF_NewSessionOptions();
  }
};
