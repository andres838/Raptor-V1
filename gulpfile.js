var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sh = require('shelljs');
var useref = require('gulp-useref');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var wiredep = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');

/**
 * Global paths
 */
var paths = {
  sass: ['scss/**/*.scss','!scss/main.scss'],
  html: ['www/*.html'],
  js: ['www/app/**/*.js']
};

/**
 * For IONIC cli 2.0
 */
gulp.task('serve:before', ['serve']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);
gulp.task('upload:before', ['build']);

/**(1)
 * Task for nove html views in a final production package.
 */
gulp.task('move', function(){
  gulp.src(['www/app/**/*.html'], { relative: true})
    .pipe(gulp.dest('dist/app'));
});

/**(2)
 * Task for generate the compilation and minification of files in only one archive for css and js.
 */
gulp.task('useref', function (done) {
  gulp.src('./www/*.html')
    .pipe(useref())
    /*.pipe(gulpif('*.js', uglify()))*/
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});

/**(3)
 * Task for inject a sass files imports in the main sass file, between two tags especific.
 */
gulp.task('imports', function(){
  var sources = gulp.src(['!./scss/general/**/*','scss/**/**/*.scss','!scss/main.scss']);
  var target = gulp.src('scss/main.scss');
  return target.pipe(inject(sources, {
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    relative: true,
    transform: function (filepath) {
      return '@import "' + filepath + '";';
    }

  }))
  .pipe(gulp.dest('./scss'));
});


/**
 * Task for inject the js bower_components dependencies in the index.html
 */
gulp.task('wiredep', function () {
  gulp.src('./www/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./www'));
});

/**
 * Task for inject the js and css features dependencies in the index.html
 */
gulp.task('inject', function () {
  gulp.src('./www/index.html')
    .pipe(inject(
      gulp.src(['./www/app/**/*.js']).pipe(angularFilesort()), { relative: true }
    ))
    .pipe(inject(
        gulp.src(['./www/css/**/*.css'], { read: false }), { relative: true }
    ))
    .pipe(gulp.dest('./www'));
});

/**
 * Task for generate a final production package.
 */
gulp.task('build', ['sass', 'move'], function() {
  gulp.start(['inject', 'wiredep', 'useref']);
});

/**
 * Task for processing a sass code and generate a css file.
 */
gulp.task('sass', ['imports'], function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sass(
      { sourceComments: true,
        outputStyle:'expanded'
      }))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./www/css/'));
});

/**
 * Task for inject the css bower_components dependencies in the main.scss
 */
gulp.task('wiredep:sass', ['sass'], function () {
  gulp.src('./scss/main.scss')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./scss'));
});


/**
 * Task for listen changes in files and execute another tasks.
 */
gulp.task('watch', ['inject', 'wiredep'], function () {
  watch(paths.sass, function(){
    gulp.start('sass');
  });
  watch(paths.js, function(){
    gulp.start('inject');
  });
});

/**
 * Task for run a server in a webbrowser and generate the injections so execute a task calls 'watch'
 */
gulp.task('serve', ['wiredep','wiredep:sass'], function() {
  gulp.start(['watch']);
});



/**
 * Git gulp default
 */
gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

/**
 * Git gulp default
 */
gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});