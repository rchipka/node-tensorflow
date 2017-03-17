'use strict';

module.exports = function (bindings) {
  var Operation = bindings.Operation = function Operation() {
    this.instance = new bindings.TF_NewOperation();
  }

  Operation.getOpList = function () {
    var buffer = bindings.TF_GetAllOpList();

    return (new bindings.OpList()).ParseFromArray(buffer.data, buffer.length);
  }

  Operation.getOpts = function () {
    var list = Operation.getOpList(),
        total = list.op_size();

    for (var i = 0; i < total; i++) {
      var op = list.op(i),
          name = op.name(),
          attrLen = op.attr_size();

      console.log(name);
      for (var j = 0; j < attrLen; j++) {
        var attr = op.attr(j);
        // console.log(attr.name())
        // console.log(attr.description());
      }
    }
  }
};
