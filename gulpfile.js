/* global require, console */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var scripts = {
    src:  {
        name: 'scripts',
        entry: 'src/js/app.js',
        paths: ['src/**/*.js'],
        outFolder: 'build',
        outFile: 'dest.js'
    },
    test: {
        name: 'scripts-test',
        entry: 'test/testSuite.js',
        paths: ['test/**/*.js', 'src/**/*.js'],
        outFolder: 'build/test',
        outFile: 'dest.js'
    }
};

var reloadWatchPath = 'build/**';

var handleError = function(error) {
    console.log(error.toString());
    this.emit('end');
};

var setupEntries = function(name, entry, destinationFolder, destinationName) {
    gulp.task(name, function() {  
    gulp.src(entry)
        .pipe(browserify({
            debug : !gulp.env.production,
            ignoreMissing : true
        }))
        .on('error', handleError)
        .pipe(concat(destinationFolder))
        .pipe(gulp.dest(destinationName));
    });
};

var setupWatch = function(name, paths) {
    gulp.task(name + '-watch', function() {
        gulp.watch(paths, [name]);
    });
};

var setup = function(definition) {
    setupEntries(definition.name, definition.entry,
                 definition.outFile, definition.outFolder);

    setupWatch(definition.name, definition.paths);
};

var setupLiveReload = function(watchPath) {
    gulp.task('reload', function() {
        var server = livereload();
        gulp.watch(watchPath).on('change', function(file) {
            server.changed(file.path);
        });
    });
};

setup(scripts.test);
setup(scripts.src);
setupLiveReload(reloadWatchPath);

gulp.task('default', [scripts.src.name, scripts.test.name,
                      scripts.src.name + '-watch',
                      scripts.test.name + '-watch', 'reload']);