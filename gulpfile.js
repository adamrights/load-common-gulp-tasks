'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  gutil = require('gulp-util'),
  mocha = require('gulp-spawn-mocha');

function errorLogger(err) {
  gutil.beep();
  gutil.log(err.message);
}

function lint() {
  return gulp.src([
    './*.js',
    './test/**/*.js'
  ])
    .pipe(jshint('./lint/.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'))
    .on('error', errorLogger);
}

function test() {
  return gulp.src([
    './test/**/*.js',
    '!./test/helper/**'
  ])
    .pipe(mocha({reporter: 'dot'}))
    .on('error', errorLogger);
}

gulp.task('lint', function () {
  return lint();
});

gulp.task('test', ['lint'], function () {
  return test();
});

// when watching, do NOT return the stream, otherwise watch won't continue on error
gulp.task('lint-watch', function () {
  lint();
});

gulp.task('test-watch', ['lint-watch'], function () {
  test();
});

gulp.task('watch', function () {
  gulp.watch([
    './*.js',
    './test/**/*.js'
  ], ['test-watch']);
});

gulp.task('default', ['watch']);
