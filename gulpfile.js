'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const pngout = require('imagemin-pngout');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: './src',
      routes: {
        '/node_modules': 'node_modules',
      },
    },
    notify: false,
  });
});

gulp.task('html-copy', function () {
  return gulp.src('src/**/*.html').pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('js-copy', function () {
  return gulp.src('src/js/*.js')
      .pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 10 versions'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css:minify', function () {
  return gulp.src('src/css/*.css')
      .pipe(cleanCss({ compatibility: 'ie8' }))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngout()],
      })))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'css:minify', 'html-copy', ['js-copy', 'images', 'fonts'], callback);
});

gulp.task('default', function (callback) {
  runSequence('watch', callback);
});