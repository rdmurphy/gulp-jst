'use strict';

var compile = require('lodash').template;
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-jst';

module.exports = function(options) {
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isBuffer()) {
      try {
        file.contents = new Buffer(compile(file.contents.toString(), null, options).source);
      } catch(err) {
        this.emit('error', new PluginError(PLUGIN_NAME, err));
      }

      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported.'));
      return cb();
    }
  });

  return stream;
};
