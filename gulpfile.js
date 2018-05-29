const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const $ = require('gulp-load-plugins')()
const paths = {
  src: {
    css: './src/style/*.css',
    js: './src/js/*.js',
    pug: './src/pug/*.pug',
    images: './src/img/**'
  },
  dest: {
    html: './dest',
    css: './dest/style',
    js: './dest/js',
    images: './dest/img'
  }
}

gulp.task('pug', () => {
  gulp.src(paths.src.pug)
    .pipe($.pug())
    .pipe(gulp.dest('./dest'))
})

gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe($.cleanCss({ compatibility: '*'}))
    .pipe(gulp.dest(paths.dest.css))
})

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    .pipe($.babel({
      presets: ["es2015"]
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.dest.js))
})

gulp.task('images', () => {
  gulp.src(paths.src.images)
    .pipe($.imagemin())
    .pipe(gulp.dest(paths.dest.images))
})

// Cleaning
gulp.task('clean', () => {
  return del(['dest/**/*'])
})

gulp.task('webserver', () => {
  gulp
    .src(paths.dest.html)
    .pipe($.webserver({
      port: 8080,
      livereload: true,
      directoryLesting: false
    }))
})

gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.css, ['css'])
  gulp.watch(paths.src.js, ['scripts'])
})

gulp.task('default', ['webserver', 'watch'])
gulp.task('build', ['pug', 'css', 'scripts'])
