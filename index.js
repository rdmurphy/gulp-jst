'use strict';

var _ = require('lodash');
var template = _.template;
var gutil = require('gulp-util');
var through = require('through2');

var PLUGIN_NAME = 'gulp-jst';

module.exports = function(options) {
  var last,
      space,
      namespace,
      namestring = false;
  if(_(options).keys().contains('namespace')){
    namespace = options.namespace;
    delete options.namespace;
    namestring = '';
    last = 'this';
    space = namespace.split('.');
    if (space.length === 1){
      namestring = 'this["'+namespace+'"] = ';
    } else {
      _(space).each(function(piece, index){
        var carrier, line;
        carrier = last + '["' + piece + '"]';
        last = carrier;
        if (index < space.length - 1){
          line = last + ' = ' + last + " || {};\n";
          namestring += line;
        }
      });
      namestring += last + ' = ';
    }
  }
  var stream = through.obj(function(file, enc, cb) {
    var source;
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isBuffer()) {
      try {
        source = template(file.contents.toString(), null, options).source;
        if (namestring){
          source = namestring + source;
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
