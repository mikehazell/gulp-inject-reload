var gulp = require('gulp'),
    noop = require('gulp-util').noop,
    less = require('less'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    injectReload = require('gulp-inject-reload');

// Allow turning dev tools off for production builds
var dev = false;

gulp.task('styles', function(){
    return gulp.src('src/styles/main.less')
        .pipe(dev? watch() : noop())
        .pipe(less())
        .pipe(dev? gulp.dest('.tmp/css') : gulp.dest('deploy/css'))
        .pipe(dev? livereload() : noop());
});

gulp.task('pages', function(){
    return gulp.src('src/*.html')
        .pipe(dev? watch() : noop())
        .pipe(dev? injectReload() : noop())
        .pipe(dev? gulp.dest('.tmp') : gulp.dest('deploy'))
        .pipe(dev? livereload() : noop());
});

gulp.task('default', ['styles', 'pages']);

gulp.task('dev', function(){
    dev = true;
    gulp.start('default');
});
