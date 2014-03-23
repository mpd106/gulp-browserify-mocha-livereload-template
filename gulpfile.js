/* global require, console */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');  
var lr = require('tiny-lr');  
var server = lr();

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
        .pipe(refresh(server));
    });
};

setupScripts(scripts.src.name, scripts.src.paths, 'dest.js', 'build');
setupScripts(scripts.test.name, scripts.test.paths, 'dest.js', 'build/test');

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('watch', function() {
    gulp.watch(scripts.src.paths, [scripts.src.name]);
    gulp.watch(scripts.test.paths, [scripts.test.name]);
});

gulp.task('default', ['lr-server', scripts.src.name, scripts.test.name, 'watch']);

                             
//gulp.task('default', function() {  
//    gulp.run('lr-server', 'scripts');

//    gulp.watch('src/**', function(event) {
//        gulp.run('scripts');
//    });
//});