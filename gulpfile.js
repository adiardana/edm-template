const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require("gulp-notify");

gulp.task('fileinclude', function() {
  const onError = function(err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>",
      sound:    "Beep"
    })(err);
    this.emit('end');
  };

  return gulp.src(['./index.html'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@root'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./html'))
    .pipe(browserSync.stream());
});

gulp.task('copy-image', function() {
  gulp.src('./images/**/*')
    .pipe(gulp.dest('./html/images'))
    .pipe(browserSync.stream());
});

gulp.task('default', function() {
  browserSync.init({
    server: {
      baseDir: "./html"
    }
  });
  gulp.watch('./images/**/*', ['copy-image']);
  gulp.watch(['./index.html', './src/**/*.html'], ['fileinclude']);
});

gulp.task('build', ['fileinclude', 'copy-image']);
