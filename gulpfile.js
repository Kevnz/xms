'use strict';

var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  babelify = require('babelify'),
  rework = require('gulp-rework'),
  inherit = require('rework-inherit'),
  vars = require('rework-vars'),
  imprt = require('rework-import'),
  autoprefixer = require('gulp-autoprefixer'),
  reworkNPM = require('rework-npm'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  media = require('rework-custom-media');
 
gulp.task('watch', function() {
    //var server = plugins.livereload();

    watch('./admin/**/*.*' , function(file) {
        gulp.start('buildjs');
        //server.changed(file.path);
    });
    watch('./css/**/*.css', function(file) {
        gulp.start('buildcss');
        //server.changed(file.path);
    });

});
gulp.task('buildcss', function () {
    var mediaOptions = {
      map: {
        '--small-screen': 'screen and (max-width:40em)',
        '--medium-screen': 'screen and (min-width: 40em)',
        '--large-screen': 'screen and (min-width: 60em)'
      }
    };
    return gulp.src('./css/style.css')
        .pipe(rework(reworkNPM({ 
            shim: { 
                'purecss': 'build/pure.css',
                'font-awesome' : 'css/font-awesome.css'
            }}),
            media(mediaOptions),
            vars(), 
            inherit(),
            imprt({
                path: './css/modules/'
            })
            )
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('templates/css/'));
});
 
gulp.task('buildjs', function () {
 
    return browserify({ entries:['./admin/app.js'], debug: true })
        .transform(babelify.configure({
          experimental: false
        })) 

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
 
 gulp.task('build', ['buildjs', 'buildcss']);
gulp.task('default', [ 'build' ]);