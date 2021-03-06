'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var fileInclude = require('gulp-file-include');
var del         = require('del');
var uglify      = require('gulp-uglify');

gulp.task('javascript', function() {
  return gulp.src([
    './assets/javascript/*.js'
  ])
  .pipe(concat('app.min.js'))
  //.pipe(uglify())
  .pipe(gulp.dest( 'public/js' ));
});

gulp.task('include', function() {
  gulp.src(['./assets/views/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./public/pages'));
});

gulp.task('styles', function() {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe( sass({
      outputStyle: 'compressed',
      errLogToConsole: true,
      includePaths: require('node-bourbon').includePaths
    }) )
    .pipe(gulp.dest('public/css'));
});

gulp.task('clean', function() {
  del(['./public/pages/', './public/css/'], function() {
    console.log('\nFiles Deleted :) \n');
  });
});


gulp.task('watch', function() {
  gulp.watch('./assets/scss/**/*.scss', ['styles']);
  gulp.watch('./assets/views/**/*.html', ['include']);
  gulp.watch('./assets/javascript/**/*.js', ['javascript']);
});

gulp.task('default', ['clean', 'javascript', 'styles', 'include']);