%ignore TF_Operation();
%ignore ~TF_Operation();
%ignore TF_Session::mu;
%ignore TF_Graph::mu;

%{
  #include "tensorflow/core/framework/allocator.h"

  static void Deallocator(void* data, size_t, void* arg) {
    tensorflow::cpu_allocator()->DeallocateRaw(data);
    *reinterpret_cast<bool*>(arg) = true;
  }
%}

%typemap(in, numinputs=0) void (*deallocator)(void* data, size_t len, void* arg) {
  $1 = &Deallocator;
}

%typemap(in, numinputs=0) void* deallocator_arg {
  bool deallocator_called = false;
  $1 = &deallocator_called;
}

%typemap(in, numinputs=1) (const int64_t* dims, int) {
  v8::Local<v8::Array> array;
  v8::Local<v8::Value> jsvalue;
  int i = 0, res = 0;
  unsigned long long temp;

  if ($input->IsArray()) {
    array = v8::Local<v8::Array>::Cast($input);

    $2 = array->Length();
    $1  = ($1_ltype) malloc(sizeof($1_ltype) * $2);

    // Get each element from array
    for (i = 0; i < $2; i++) {
      jsvalue = array->Get(i);

      // Get primitive value from JSObject
      res = SWIG_AsVal(unsigned long long)(jsvalue, &temp);
      if (!SWIG_IsOK(res)) {
        SWIG_exception_fail(SWIG_ERROR, "Failed to convert $input to double");
      }

      $1[i] = (int64_t) temp;
    }
  } else {
    SWIG_exception_fail(SWIG_ERROR, "$input is not an array");
  }
}

%typemap(in, numinputs=0) (void* data, size_t len) {
  int total = 0, length = arg3, i = 0;

  for (; i < length; i++) {
    total += arg2[i];
  }

  $2 = total * sizeof(float);
  $1 = reinterpret_cast<float*>(tensorflow::cpu_allocator()->AllocateRaw(
      EIGEN_MAX_ALIGN_BYTES, $2));
}

%typemap(freearg) (const int64_t* dims, int) {
  free($1);
}

%typemap(in, numinputs=0) (tensorflow::Node** created_node) {
  Node* node;
  $1 = &node;
}

%typemap(argout) (tensorflow::Node** created_node) {
  $result = SWIG_NewPointerObj(ToOperation(*$1), SWIGTYPE_p_TF_Operation, 0 |  0 );
}

%typemap(out) TF_Status* {
  if (!SWIG_IsOK($1)) {
    SWIG_exception_fail(SWIG_ERROR, TF_Message($1));
  }
}

%typemap(out) Status {
  if (!$1.ok()) {
    SWIG_exception_fail(SWIG_ERROR, $1.error_message().c_str());
  }
}

%{
#include "tensorflow/c/c_api.h"
#include "tensorflow/core/util/port.h"
#include "tensorflow/core/public/version.h"
#include "tensorflow/core/framework/types.pb.h"
#include "tensorflow/core/framework/node_def.pb.h"
#include "tensorflow/core/framework/variable.pb.h"
#include "tensorflow/core/framework/attr_value.pb.h"
#include "tensorflow/core/framework/tensor.pb.h"
#include "tensorflow/core/framework/op_def.pb.h"
#include "tensorflow/core/framework/graph.pb.h"
#include "tensorflow/core/graph/graph.h"
#include "tensorflow/core/lib/core/stringpiece.h"

#include "tensorflow/core/platform/macros.h"
#include "tensorflow/core/platform/env.h"
#include "tensorflow/core/public/session.h"
#include "tensorflow/core/public/session_options.h"
#include "tensorflow/core/framework/tensor.h"
#include "tensorflow/core/framework/tensor_shape.h"
#include "tensorflow/core/framework/node_def.pb.h"
#include "tensorflow/core/platform/default/thread_annotations.h"
#include "tensorflow/core/platform/mutex.h"
#include "tensorflow/core/graph/graph.h"
#include "tensorflow/core/common_runtime/shape_refiner.h"
#include "tensorflow/core/graph/node_builder.h"
#include "tensorflow/core/platform/default/mutex.h"
#include "tensorflow/core/lib/gtl/iterator_range.h"
#include "tensorflow/core/graph/graph.h"
#include "tensorflow/core/lib/core/status.h"
#include "tensorflow/core/framework/op.h"
#include "tensorflow/c/c_api.cc"
#include "c_session.cc"

using tensorflow::mutex;
using tensorflow::mutex_lock;

using namespace tensorflow;
/*using namespace std;*/
#include "google/protobuf/stubs/port.h"
#include "google/protobuf/message_lite.h"
#include "google/protobuf/message.h"
%}

%import "stl.i"
%import "std_string.i"
%import "std_pair.i"
%import "std_map.i"
%import "std_vector.i"
%import "status.i"

%import "google/protobuf/stubs/port.h"
%import "google/protobuf/descriptor.h"

%include "google/protobuf/message_lite.h"
%include "google/protobuf/message.h"

%include "tensorflow/c/c_api.h"
%include "tensorflow/core/util/port.h"
%include "tensorflow/core/public/version.h"
%include "tensorflow/core/framework/types.pb.h"
%include "tensorflow/core/framework/node_def.pb.h"
%include "tensorflow/core/framework/variable.pb.h"
%include "tensorflow/core/framework/attr_value.pb.h"
%include "tensorflow/core/framework/tensor.pb.h"
%include "tensorflow/core/framework/op_def.pb.h"
%include "tensorflow/core/lib/core/stringpiece.h"

%include "tensorflow/core/platform/macros.h"
%include "tensorflow/core/platform/env.h"
%include "tensorflow/core/public/session.h"
%include "tensorflow/core/public/session_options.h"
%include "tensorflow/core/framework/tensor.h"
%include "tensorflow/core/framework/tensor_shape.h"
%include "tensorflow/core/framework/node_def.pb.h"
%include "tensorflow/core/platform/default/thread_annotations.h"
%include "tensorflow/core/platform/mutex.h"
%include "tensorflow/core/lib/gtl/iterator_range.h"
%include "tensorflow/core/graph/graph.h"
%include "tensorflow/core/common_runtime/shape_refiner.h"
%include "tensorflow/core/graph/node_builder.h"
%include "tensorflow/core/lib/core/status.h"
%include "tensorflow/core/framework/op.h"
/*%include "tensorflow/core/platform/default/mutex.h"*/
%include "tensorflow/c/c_api.cc"
%include "c_session.cc"
