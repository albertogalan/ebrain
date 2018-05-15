'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var spawn = require('child_process').spawn,
node;
// add custom browserify options here
//https://github.com/browserify/browserify
var customOpts = {
  entries: ['main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 
var exec = require('child_process').exec;

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./client/js/')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('ebrain', function() {
  if (node) node.kill()
  node = spawn('node', ['ebrain.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('fanyi', function() {
  if (node) node.kill()
  node = spawn('node', ['fanyi.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})


//gulp.task('postgraphql', function (cb) {
 // exec('postgraphql -c postgres://postgres@ppostgres05:5432/ebrain -s ebrain', function (err, stdout, stderr) {
  //  console.log(stdout);
   // console.log(stderr);
    //cb(err);
 // });
//})



gulp.task('default', function() {
  gulp.run('ebrain')
//  gulp.run('postgraphql')

  gulp.watch(['ebrain.js'], function() {
    gulp.run('ebrain')
  })

  gulp.watch(['fanyi.js'], function() {
    gulp.run('fanyi')
  })
  gulp.watch(['./client/js/main.js'], function() {
    gulp.run('js')
  })
  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})