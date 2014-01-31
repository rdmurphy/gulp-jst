gulp-jst [![Build Status](https://travis-ci.org/rdmurphy/gulp-jst.png?branch=master)](https://travis-ci.org/rdmurphy/gulp-jst)
========

Compile [lodash templates](http://lodash.com/docs#template) to a JST file using [gulp](https://github.com/wearefractal/gulp).

Install
-------

Install using [npm](https://npmjs.org/package/gulp-jst).

```
npm install gulp-jst --save-dev
```

Usage
-----

```js
var gulp = require('gulp');
var jst = require('gulp-jst');

gulp.task('jst', function() {
    gulp.src('input/*.html')
        .pipe(jst())
        .pipe(gulp.dest('./output'));
});

gulp.task('default', ['jst']);
```

Options
-------

### jst(options)

`gulp-jst` accepts the [same _.template options](http://lodash.com/docs#template) as the lodash library.
