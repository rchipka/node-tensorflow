'use strict';

var alias = require('./aliases.js');

module.exports = function (bindings) {
  var Operation = bindings.Operation = function Operation(op) {
    this.name = op.name();
    this.summary = op.summary();
    this.description = op.description();

    var attrs = this.attrs = [], args = this.args = [],
        outputs = this.outputs = [];

    (function () {
      var i = 0,
          total = op.input_arg_size(),
          arg;

      for (; i < total; i++) {
        arg = op.input_arg(i);

        args[i] = {
          name: arg.name(),
          desc: arg.description(),
          type: bindings.types[arg.type()]
        };
      }

      return args;
    })();

    (function () {
      var i = 0,
          total = op.output_arg_size(),
          arg;

      for (; i < total; i++) {
        arg = op.output_arg(i);

        outputs[i] = {
          name: arg.name(),
          desc: arg.description(),
          type: bindings.types[arg.type()]
        };
      }

      return args;
    })();

    (function () {
      var i = 0, total = op.attr_size(), attr;

      for (; i < total; i++) {
        var attr = op.attr(i);

        attrs[i] = {
          name: attr.name(),
          desc: attr.description(),
          type: attr.type()
        };
      }
    })();

    return this;
  };

  Operation.prototype.usage = function () {

  };

  (function init() {
    var buffer = bindings.TF_GetAllOpList(),
        list = (new bindings.OpList()),
        total, i = 0, op, name,
        opTarget = bindings.OperationTarget = {};

    list.ParseFromArray(buffer.data, buffer.length);
    total = list.op_size();

    for (; i < total; i++) {
      op = new Operation(list.op(i));

      name = op.name;//.replace(/V2$/, '');

      if (opTarget[name] !== undefined) {
        continue;
      }

      // console.log(op);

      opTarget[name] =
      opTarget[alias(name)] =
      opTarget[name.charAt(0).toLowerCase() + name.substr(1)] =
        (function (op) {
          return function () {
            var args = Array.prototype.slice.call(arguments);

            args.unshift(this);

            return new bindings.OperationDescription(op, args);
          };
        })(op);
    }

    // for (i in bindings.OperationTarget) {
    //   bindings[i] = bindings.OperationTarget[i];
    // }
  })();
};
