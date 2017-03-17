%{
#include "c_api.h"
#include "tensorflow/core/util/port.h"
#include "tensorflow/core/public/version.h"
#include "tensorflow/core/framework/op_def.pb.h"
#include "tensorflow/core/lib/core/stringpiece.h"

using namespace std;
#include "google/protobuf/stubs/port.h"
#include "google/protobuf/message_lite.h"
#include "google/protobuf/message.h"
%}

%import "google/protobuf/stubs/port.h"
%import "google/protobuf/descriptor.h"

%include "google/protobuf/message_lite.h"
%include "google/protobuf/message.h"

%include "c_api.h"
%include "tensorflow/core/util/port.h"
%include "tensorflow/core/public/version.h"
%include "tensorflow/core/framework/op_def.pb.h"
%include "tensorflow/core/lib/core/stringpiece.h"
