'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cache = require('gulp-cache');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const pngout = require('imagemin-pngout');
const autoprefixer = require('gulp-autoprefixer');
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

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer('last 10 versions'))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function () {
  gulp.src('src/img/**/*')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngout()]
      })))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('css:minify', function () {
  return gulp.src('src/*.css')
      .pipe(cleanCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function () {
  return gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});

gulp.task('showcase', function () {
  return gulp.src('src/showcase').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('build', function (callback) {
  return runSequence('sass', 'css:minify', 'html', ['showcase', 'fonts', 'images'], callback);
});


gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'], callback);
});

