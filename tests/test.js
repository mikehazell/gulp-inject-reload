/*
 * gulp-inject-reload
 * https://github.com/Schmicko/gulp-inject-reload
 *
 * Copyright (c) 2014 Michael Hazell
 * Licensed under the MIT license.
 */

/* globals describe, it */

'use strict';

var fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    expect = require('chai').expect,
    injectReload = require('../');

var fixtureFile = fs.readFileSync(path.join(__dirname, './fixtures/index.html'));


describe('inject livereload', function () {

    it('should inject the livereload script into the file', function(done){
        var fakeFile = new gutil.File({
            base: 'test/fixtures',
            cwd: 'test/',
            path: 'test/fixtures/index.html',
            contents: new Buffer(fixtureFile)
        });
        var expectedScript = "\n<script>document.write('<script src=\"http://\' + (location.host || \"localhost\").split(\":\")[0] + ':35729/livereload.js?snipver=1\"></' + 'script>');</script>";
        var expectedFile = fixtureFile + expectedScript;

        var injectStream = injectReload();
        injectStream.once('data', function(newFile){
            expect(String(newFile.contents)).to.equal(expectedFile);
            done();
        });

        injectStream.write(fakeFile);
    });

    it('should use the passed options', function(done){
        var fakeFile = new gutil.File({
            base: 'test/fixtures',
            cwd: 'test/',
            path: 'test/fixtures/index.html',
            contents: new Buffer(fixtureFile)
        });

        var options = {
            host: 'http://localhost',
            port: 1234,
            script: 'test.js',
            snipver: 2
        };
        var expectedScript = "\n<script>document.write('<script src=\"http://localhost:1234/test.js?snipver=2\"></' + 'script>');</script>";
        var expectedFile = fixtureFile + expectedScript;

        var injectStream = injectReload(options);
        injectStream.once('data', function(newFile){
            expect(String(newFile.contents)).to.equal(expectedFile);
            done();
        });

        injectStream.write(fakeFile);
    });

});
