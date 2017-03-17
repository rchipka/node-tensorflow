'use strict';

var os    = require('os'),
    fs    = require('fs'),
    https = require('https'),
    path  = require('path'),
    exec  = require('child_process').exec,
    TF_VERSION      = '1.0.1',
    TF_PY_VERSION   = 'py2-none',
    TF_PLATFORM     = os.platform() === 'darwin' ? 'mac': 'linux',
    TF_ARCH         = TF_PLATFORM === 'mac' ? 'any' : 'linux_x86_64',
    TF_GPU_ENABLED  = TF_PLATFORM !== 'mac',
    TF_BINARY_URL   = 'https://storage.googleapis.com/tensorflow/' +
      TF_PLATFORM + '/' + (TF_GPU_ENABLED ? 'gpu' : 'cpu') +
      ['/tensorflow', TF_VERSION, TF_PY_VERSION, TF_ARCH].join('-') + '.whl',
    TF_ROOT_DIR     = path.resolve(__dirname, '..'),
    TF_BINARY_FILE  = path.resolve(TF_ROOT_DIR, 'binary.zip'),
    TF_TARGET_DIR   = path.resolve(TF_ROOT_DIR, 'bazel-out'),
    UNZIP_COMMAND   = 'unzip -q -o -d ' + TF_TARGET_DIR + ' ' + TF_BINARY_FILE;

// URL structure obtained from:
// https://www.tensorflow.org/versions/r0.10/get_started/os_setup

fs.stat(TF_BINARY_FILE, function (err, stats) {
  if (!err) {
    unzip();
    return;
  }

  https.get(TF_BINARY_URL, function (response) {
    var read = 0, total = parseInt(response.headers['content-length'], 10);

    response.on('data', function (buffer) {
      process.stderr.write(
        '\r' + (((read += buffer.length) / total) * 100).toFixed(0) + '%' +
        ' - Downloading ' + TF_BINARY_URL);
    }).pipe(fs.createWriteStream(TF_BINARY_FILE));

    response.on('end', function () {
      console.log('\nSaved to ' + TF_BINARY_FILE);
      unzip();
    });
  });
});

function unzip() {
  exec(UNZIP_COMMAND, function (err, stdout, stderr) {
    if (err) {
      console.error(err.toString());
      return;
    }

    fs.renameSync(
      path.resolve(TF_TARGET_DIR, 'tensorflow-' + TF_VERSION + '.data'),
      path.resolve(TF_TARGET_DIR, 'local-opt'));

    fs.renameSync(
      path.resolve(TF_TARGET_DIR, 'local-opt', 'purelib'),
      path.resolve(TF_TARGET_DIR, 'local-opt', 'bin'));

    fs.unlinkSync(TF_BINARY_FILE);
  });
}
