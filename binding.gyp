{
  'targets': [{
    'target_name': 'tensorflow',
    'product_extension': 'node',
    'sources': [
      'src/c_api.cc',
      'src/tensorflow.cc'
    ],
    'libraries' : [
      '-lpython',
      '../bazel-out/local-opt/bin/tensorflow/python/_pywrap_tensorflow.so',
      '../bazel-out/local-opt/bin/external/protobuf/pyext/_message.so'
    ],
    'include_dirs' : [
      'src/swig',
      'src/include',
      'bazel-out/local-opt/bin/tensorflow/include',
      "<!(node -e \"require('nan')\")"
    ],
    "conditions": [
      [ "OS==\"mac\"", {
        "xcode_settings": {
          "OTHER_CFLAGS": [
            "-mmacosx-version-min=10.7",
            "-std=c++",
            "-stdlib=libc++",
          ],
          "OTHER_LDFLAGS": [
            '-stdlib=libc++',
            '-v'
          ],
          "OTHER_CPLUSPLUSFLAGS": [
            '-std=c++11',
            '-stdlib=libc++',
            '-v'
          ],
          "GCC_ENABLE_CPP_RTTI": "YES",
          "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
          'MACOSX_DEPLOYMENT_TARGET': '10.12',
        },
      }]
    ],
    'cflags': [
    ],
    "cflags!": [
      "-fno-exceptions"
    ],
    'cflags_cc!': [
      "-fno-rtti", "-fno-exceptions"
    ]
  }]
}
