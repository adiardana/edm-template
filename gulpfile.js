const gulp = require('gulp');
const mjml = require('gulp-mjml')
const image = require('gulp-image');

gulp.task('image', function () {
  // https://github.com/1000ch/gulp-image
  gulp.src('./images/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('./html/images'));
});

gulp.task('mjml', function () {
  return gulp.src('./*.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./html'))
});

gulp.task('default', function() {
    gulp.watch(['./**/*.mjml'], ['mjml']);
    gulp.watch(['./images/*'], ['image']);
});

gulp.task('build', ['mjml', 'image']);