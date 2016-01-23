var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence');

var base = {
    assets: 'bower_components',
    build: 'src',
    port: 9000,
    apiPort: 9001,
    liveReloadPort: 35729
};

gulp.task('bS', function(){
  browserSync.reload({ stream: true });
});

gulp.task('watch', function() {
    gulp.watch(base.build + '/**/*.*', ['bS']);
});

// server task
gulp.task('server', function() {
  gutil.log('The server command is no longer used, please move to serve. But we`ll start it this time anyway :) ');
  runSequence('serve');
});

// browser sync
gulp.task('bSync', function() { // Used to setup BrowserSync when running in dev
  var baseUri = 'http://localhost:' + base.apiPort;
  browserSync({
      open: false,
      port: base.port,
      //host: "rhub.responsetap.com",
      //ui: false, // allows the ui to be removed
      //tunnel: true, // This can show websites to the outside world from the local machine, must be careful with this
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
      },
      logLevel: "info", // can be "info", "debug", "warn", or "silent"
      reloadOnRestart: true,
      notify: true, // can be used to advise a viewer they are connected to BSync with a pop up
      server: {
          baseDir: base.build
      }
  });
});

gulp.task('serve', function() {
    runSequence('bSync', 'watch');
});

gulp.task('default', function(){
    runSequence('serve');
});
