/*
 * gulp-inject-reload
 * https://github.com/Schmicko/gulp-inject-reload
 *
 * Copyright (c) 2014 Michael Hazell
 * Licensed under the MIT license.
 */

var es = require('event-stream'),
    extend = require('util')._extend,
    gutil = require('gulp-util');

var defaults = {
        port: 35729,
        host: 'http://\' + (location.host || "localhost").split(":")[0] + \'',
        script: 'livereload.js',
        snipver: 1
    },
    template = function(opts){
        var scriptSrc = opts.host + ':' + opts.port + '/' + opts.script + '?snipver=' + opts.snipver;
        return '\n<script>document.write(\'<script src="' + scriptSrc + '"></\' + \'script>\');</script>';
    };

function injectReload(filecontents, opts){
    options = extend({}, defaults);
    options = extend(options, opts);

    return filecontents + template(options);
}

module.exports = function (opts) {
    'use strict';

    return es.map(function (file, cb) {
        try {
            file.contents = new Buffer( injectReload( String(file.contents), opts ));
        } catch (err) {
            return cb(new gutil.PluginError('gulp-inject-reload', err, opts));
        }
        cb(null, file);
    });
};
