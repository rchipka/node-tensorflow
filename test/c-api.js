'use strict';

var tf     = require('../'),
    assert = require('assert'),
    constants = {
      numeric: [
        'TF_FLOAT', 'TF_DOUBLE', 'TF_INT32', 'TF_UINT8', 'TF_INT16',
        'TF_INT8', 'TF_STRING', 'TF_COMPLEX64', 'TF_COMPLEX', 'TF_INT64',
        'TF_BOOL', 'TF_QINT8', 'TF_QUINT8', 'TF_QINT32', 'TF_BFLOAT16',
        'TF_QINT16', 'TF_QUINT16', 'TF_UINT16', 'TF_COMPLEX128', 'TF_HALF',
        'TF_RESOURCE', 'TF_OK', 'TF_CANCELLED', 'TF_UNKNOWN',
        'TF_INVALID_ARGUMENT', 'TF_DEADLINE_EXCEEDED', 'TF_NOT_FOUND',
        'TF_ALREADY_EXISTS', 'TF_PERMISSION_DENIED', 'TF_UNAUTHENTICATED',
        'TF_RESOURCE_EXHAUSTED', 'TF_FAILED_PRECONDITION', 'TF_ABORTED',
        'TF_OUT_OF_RANGE', 'TF_UNIMPLEMENTED', 'TF_INTERNAL', 'TF_UNAVAILABLE',
        'TF_DATA_LOSS', 'TF_ATTR_STRING', 'TF_ATTR_INT', 'TF_ATTR_FLOAT',
        'TF_ATTR_BOOL', 'TF_ATTR_TYPE', 'TF_ATTR_SHAPE', 'TF_ATTR_TENSOR',
        'TF_ATTR_PLACEHOLDER', 'TF_ATTR_FUNC', 'TF_MAJOR_VERSION',
        'TF_MINOR_VERSION', 'TF_PATCH_VERSION',
        'TF_GRAPH_DEF_VERSION_MIN_PRODUCER',
        'TF_GRAPH_DEF_VERSION_MIN_CONSUMER', 'TF_GRAPH_DEF_VERSION',
        'TF_CHECKPOINT_VERSION_MIN_PRODUCER',
        'TF_CHECKPOINT_VERSION_MIN_CONSUMER', 'TF_CHECKPOINT_VERSION'
      ],
      string: [
        'TF_VERSION_SUFFIX', 'TF_VERSION_STRING'
      ],
      function: [
        'TF_Version', 'TF_DataTypeSize', 'TF_NewStatus', 'TF_DeleteStatus',
        'TF_SetStatus', 'TF_GetCode', 'TF_Message', 'TF_NewBufferFromString',
        'TF_NewBuffer', 'TF_DeleteBuffer', 'TF_GetBuffer', 'TF_NewTensor',
        'TF_AllocateTensor', 'TF_DeleteTensor', 'TF_TensorType', 'TF_NumDims',
        'TF_Dim', 'TF_TensorByteSize', 'TF_TensorData', 'TF_StringEncode',
        'TF_StringDecode', 'TF_StringEncodedSize', 'TF_NewSessionOptions',
        'TF_SetTarget', 'TF_SetConfig', 'TF_DeleteSessionOptions',
        'TF_NewGraph', 'TF_DeleteGraph', 'TF_GraphSetTensorShape',
        'TF_GraphGetTensorNumDims', 'TF_GraphGetTensorShape',
        'TF_NewOperation', 'TF_SetDevice', 'TF_AddInput', 'TF_AddInputList',
        'TF_AddControlInput', 'TF_ColocateWith', 'TF_SetAttrString',
        'TF_SetAttrStringList', 'TF_SetAttrInt', 'TF_SetAttrIntList',
        'TF_SetAttrFloat', 'TF_SetAttrFloatList', 'TF_SetAttrBool',
        'TF_SetAttrBoolList', 'TF_SetAttrType', 'TF_SetAttrTypeList',
        'TF_SetAttrShape', 'TF_SetAttrShapeList',
        'TF_SetAttrTensorShapeProto', 'TF_SetAttrTensorShapeProtoList',
        'TF_SetAttrTensor', 'TF_SetAttrTensorList', 'TF_SetAttrValueProto',
        'TF_FinishOperation', 'TF_OperationName', 'TF_OperationOpType',
        'TF_OperationDevice', 'TF_OperationNumOutputs',
        'TF_OperationOutputType', 'TF_OperationOutputListLength',
        'TF_OperationNumInputs', 'TF_OperationInputType',
        'TF_OperationInputListLength', 'TF_OperationInput',
        'TF_OperationOutputNumConsumers', 'TF_OperationOutputConsumers',
        'TF_OperationNumControlInputs', 'TF_OperationGetControlInputs',
        'TF_OperationNumControlOutputs', 'TF_OperationGetControlOutputs',
        'TF_OperationGetAttrMetadata', 'TF_OperationGetAttrString',
        'TF_OperationGetAttrStringList', 'TF_OperationGetAttrInt',
        'TF_OperationGetAttrIntList', 'TF_OperationGetAttrFloat',
        'TF_OperationGetAttrFloatList', 'TF_OperationGetAttrBool',
        'TF_OperationGetAttrBoolList', 'TF_OperationGetAttrType',
        'TF_OperationGetAttrTypeList', 'TF_OperationGetAttrShape',
        'TF_OperationGetAttrShapeList', 'TF_OperationGetAttrTensorShapeProto',
        'TF_OperationGetAttrTensorShapeProtoList', 'TF_OperationGetAttrTensor',
        'TF_OperationGetAttrTensorList', 'TF_OperationGetAttrValueProto',
        'TF_GraphOperationByName', 'TF_GraphNextOperation',
        'TF_GraphToGraphDef', 'TF_NewImportGraphDefOptions',
        'TF_DeleteImportGraphDefOptions', 'TF_ImportGraphDefOptionsSetPrefix',
        'TF_GraphImportGraphDef', 'TF_OperationToNodeDef', 'TF_NewSession',
        'TF_LoadSessionFromSavedModel', 'TF_CloseSession', 'TF_DeleteSession',
        'TF_SessionRun', 'TF_SessionPRunSetup', 'TF_SessionPRun',
        'TF_NewDeprecatedSession', 'TF_CloseDeprecatedSession',
        'TF_DeleteDeprecatedSession', 'TF_Reset', 'TF_ExtendGraph', 'TF_Run',
        'TF_PRunSetup', 'TF_PRun', 'TF_LoadLibrary', 'TF_GetOpList',
        'TF_DeleteLibraryHandle', 'TF_GetAllOpList', 'IsGoogleCudaEnabled',
        'CudaSupportsHalfMatMulAndConv', 'tf_compiler_version', 'tf_git_version'
      ],
      constructor: [
        'MessageLite', 'Metadata', 'Message', 'Reflection', 'MessageFactory',
        'TF_Buffer', 'TF_Input', 'TF_Output', 'TF_AttrMetadata'
      ]
}
describe('C API', function () {
  describe('#Constants', function () {
    it('numeric', function () {
      constants.numeric.forEach(function (c) {
        assert.equal(typeof tf[c], 'number');
      });
    });

    it('string', function () {
      constants.string.forEach(function (c) {
        assert.equal(typeof tf[c], 'string');
      });
    });

    it('function', function () {
      constants.function.forEach(function (c) {
        assert.equal(typeof tf[c], 'function');
      });
    });

    it('constructor', function () {
      constants.constructor.forEach(function (c) {
        assert.equal(typeof tf[c], 'function');
        assert.equal(
          tf[c].toString(), 'function ' + c + '() { [native code] }');
      });
    });
  });
});
