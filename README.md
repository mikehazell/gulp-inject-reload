# gulp-inject-reload
[![Build Status](https://travis-ci.org/Schmicko/gulp-inject-reload.svg?branch=master)](https://travis-ci.org/Schmicko/gulp-inject-reload)

A simple gulp plugin to inject the livereload script to the end of html files.
Works with [gulp-livereload](https://www.npmjs.org/package/gulp-livereload/).

## Usage:

**Gulp**

```js
    gulp.task('example', function(){
        gulp.src('index.html')
            .pipe(injectReload({
                    host: 'http://localhost'
                }))
            .pipe(gulp.dest('build'));
    });
```

**Result**

```html
    ... html content of index.html ...
    <script>document.write('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');</script>
```

## Options

Options are available for the various parts of the url (defaults below):

```js
    {
        port: 35729,
        host: 'http://" + (location.host || "localhost").split(":")[0] + "',
        script: 'livereload.js',
        snipver: 1
    }
```

## Example with watch and gulp-livreload

```js
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
```
