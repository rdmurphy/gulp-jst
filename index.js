'use strict';

var compile = require('lodash').template;
var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-jst';

module.exports = function(options, jstOptions) {
  jstOptions = jstOptions || {};
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isBuffer()) {
      try {
        var source = compile(file.contents.toString(), null, options).source;
        if (jstOptions.amd) {
          source = 'define(function() {\r\nreturn ' + source + '\r\n});';
        }
        file.contents = new Buffer(source);
        file.path = gutil.replaceExtension(file.path, ".js");
      } catch(err) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
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
