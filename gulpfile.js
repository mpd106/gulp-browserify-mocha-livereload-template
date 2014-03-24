/* global require, console */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var scripts = {
    src:  {
        name: 'scripts',
        paths: ['src/**/*.js']
    },
    test: {
        name: 'scripts-test',
        paths: ['test/*.js']
    }
};

var handleError = function(error) {
    console.log(error.toString());
    this.emit('end');
};

var setupScripts = function(scriptsName, scriptsPaths, destinationFolder, destinationName) {
    gulp.task(scriptsName, function() {  
    gulp.src(scriptsPaths)
        .pipe(browserify({
            debug : !gulp.env.production,
            'ignoreMissing': true
        }))
        .on('error', handleError)
        .pipe(concat(destinationFolder))
        .pipe(gulp.dest(destinationName))
        .pipe(livereload());
    });
};

setupScripts(scripts.src.name, scripts.src.paths, 'dest.js', 'build');
setupScripts(scripts.test.name, scripts.test.paths, 'dest.js', 'build/test');

gulp.task('watch', function() {
    gulp.watch(scripts.src.paths, [scripts.src.name]);
    gulp.watch(scripts.test.paths, [scripts.test.name]);
});

gulp.task('default', [scripts.src.name, scripts.test.name, 'watch']);