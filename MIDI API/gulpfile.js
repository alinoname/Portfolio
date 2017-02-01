var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

gulp.task('scss', function() {
    return gulp.src("sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
                // sourceComments: true,
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.reload({stream: true}));
})
gulp.task('default', ['scss'], function() {

  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

    gulp.watch('sass/**/*.scss', ['scss']);
    gulp.watch('./index.html', browserSync.reload);
      gulp.watch('js/**/*.js', browserSync.reload);
});
