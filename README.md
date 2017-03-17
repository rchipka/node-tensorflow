# TensorFlow
Native TensorFlow bindings for Node.JS

# Install

`npm install tensorflow`

# Features

 * Fully exposes the TensorFlow [C API](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/c/c_api.h)
 * Fast native bindings (no FFI)
 * Composable, intuitive wrapper API
 * No TensorFlow install/build required

# Globals

## tf.Graph()
## tf.Session()
## tf.Operation()
## tf.Tensor(tf.DataType, [tf.TensorShape])

## Instance methods

### Tensor.batchToSpace(block_shape, crops)
### Tensor.cast(type)
### Tensor.broadcast(tensor)
### Tensor.isNumeric()
Returns true if the tensor doesn't contain NaN or Infinity values.
### Tensor.concat(tensors[], axis) // ops::Concat, ops::ParallelConcat
### Tensor.copy([name])
### Tensor.copyHost([name])
### Tensor.debugID()
### Tensor.countNAN()
### Tensor.summary()
### Tensor.depthToSpace(block_size)
### Tensor.dequantize(minRange, maxRange, quantize)

quantize = true || {
  signed: // If the quantization is signed or unsigned.
  bits: // The bitwidth of the quantization.
  minRange:
  maxRange:
}
### Tensor.diagonal([diagonal]) // ops::Diag and ops::MatrixBandPart
opts = {
  upper: true || number of superdiagonals to keep
  lower: true || number of subdiagonals to keep
}
if given a diagonal, this method sets the diagonal values
### Tensor.leven(tensor, { normalized: false })
### Tensor.expand(axis)
### Tensor.quantize(min, max, [type], [gradient])
### Tensor.fill(value, [dimensions])
### Tensor.gather(indices)
### Tensor.clone() // ops::Identity, ops::ZerosLike
### Tensor.freeze() // ops::ImmutableConst
### Tensor.invert() // ops::InvertPermutation
### Tensor.pad(paddings, mode) // ops::Pad, ops::MirrorPad
### Tensor.quantize(minRange, maxRange, type)
### Tensor.quantizedInstanceNorm(min, max, opts)

opts = {
    output_range_given: If True, given_y_min and given_y_min and given_y_max are used as the output range. Otherwise, the implementation computes the output range.
    given_y_min: Output in y_min if output_range_given is True.
    given_y_max: Output in y_max if output_range_given is True.
    variance_epsilon: A small float number to avoid dividing by 0.
    min_separation: Minimum value of y_max - y_min
}

### Tensor.reverse(axis)
### Tensor.reverseSequence(sequenceLengths, sequenceDimension, reverseDimension)
### Tensor.scatter(indices, values, [shape])
### Tensor.diff(tensor)
### Tensor.shape([shape])
Return the shape of the tensor.

If shape is provided, sets the shape of the tensor.

### Tensor.size()
### Tensor.slice(offset, length, strides)
### Tensor.spaceToBatch(block_shape, paddings)
### Tensor.squeeze([dimensionIndices])

## Static methods

### Tensor.diagonal(diagonal)
### Tensor.oneHot(indices, value, [opts])
### Tensor.quantize(tensors[], dimensions, min[], max[])
### Tensor.shapes(tensors[])
### Tensor.split(axis, count, byValue (ops::SplitV))
### Tensor.stack(tensors[], [axis])
### Tensor.tile(multiples)
### Tensor.transpose(permutation)
### Tensor.unique(counts == false)
### Tensor.unstack([axis])
### Tensor.where()

opts = {
  axis: 1,
  depth: 1,
  zeros: 0.1
}


## tf.Image()

## Static methods

### Image.extractPatches([images], windowSize, centerStride, rates, padding)

# Global methods

### tf.IsGoogleCudaEnabled()
### tf.LogAllRegisteredKernels()
