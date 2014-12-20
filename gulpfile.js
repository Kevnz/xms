'use strict';

var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  es6ify = require('es6ify'),
  reactify = require('reactify');

 
 
gulp.task('build', function () {
 
    return browserify({ entries:['./admin/app.js'], debug: true })
      .transform(reactify)
      .transform(es6ify)

        .bundle()
        .on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            //throw e;
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./templates/js')) 
        .on('end', function () {
            console.log('ended');
        });
});
 
 
gulp.task('default', [ 'build' ]);