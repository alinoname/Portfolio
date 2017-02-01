var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: ".",
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    // gulp.watch("css/*.css",['autoprefixer']);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths,
      errLogToConsole: true,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest("css/"))
      .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('autoprefixer', function () {

    return gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/'));
});


// gulp.task('default', ['sass'], function() {
//   gulp.watch(['scss/**/*.scss'], ['sass']);
// });

gulp.task('default', ['serve']);
