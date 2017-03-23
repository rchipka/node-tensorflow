#!/bin/bash

ROOT="$(dirname "${BASH_SOURCE[0]}")/.."
SOURCE="$ROOT/src/tensorflow.i"
TARGET="$ROOT/src/tensorflow.cc"

#
# Extra debugging options
#
# INCLUDE="-importall"
# INCLUDE="-includeall"
# -I/usr/include \
# -I/usr/local/include \
# -I/opt/local/include \
# -I/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include \
# -I"/Library/Developer/CommandLineTools/usr/lib/clang/5.1/include" \
# -I"/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.11.sdk/usr/include" \
# -I"/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include/c++/v1" \
# -I"/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/lib/swift-migrator/sdk/MacOSX.sdk/usr/include" \
# -debug-typemap

rm -f $TARGET

swig $INCLUDE \
     -I"$ROOT/src/include" \
     -I"$ROOT/src/swig" \
     -I"$ROOT/bazel-out/local-opt/bin/tensorflow/include" \
     -w-205,-503 \
     -cpperraswarn -ignoremissing -javascript -node -module tensorflow -c++ -v -o $TARGET $SOURCE

if [ -f $TARGET ]; then

# Fix typedef enum bug
mv $TARGET $TARGET.bak
sed s/enum\ TF_DataType/TF_DataType/g $TARGET.bak > $TARGET


# Fix void ptr bug
mv $TARGET $TARGET.bak
sed -E s/\(SWIG_as_voidptrptr[^,]+,\ *\)0/\\1SWIGTYPE_p_void/g $TARGET.bak > $TARGET


# Use consistent string type
mv $TARGET $TARGET.bak
sed s/SWIGTYPE_p_string/SWIGTYPE_p_std__string/g $TARGET.bak > $TARGET


# Useful error reporting
mv $TARGET $TARGET.bak
perl -0pe 's/(args.Length\(\) != ([0-9]+)\)\s*SWIG_exception_fail\(SWIG_ERROR, "[^\.]+)./$1 (should be $2)/smg' $TARGET.bak > $TARGET

rm -f $TARGET.bak

fi
