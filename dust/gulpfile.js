var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  // livereload = require('gulp-livereload'),
  // browserSync = require('browser-sync'),
  sass = require('gulp-ruby-sass');

var bs = require("browser-sync").create();
var portscanner =require('portscanner');
gulp.task('sass', function () {
  return sass('./public/css/**/*.scss')
    .pipe(gulp.dest('./public/css'))
    .pipe(bs.stream({match: "**/*.css"}));
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
  gulp.watch('./app/views/**/*',bs.reload);
});



gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        // nodemon our expressjs server
        script: 'app.js',
        ignore: ["views/*"],
        // watch core server file(s) that require server restart on change
        // watch: ['app.js',]
    }).on('start', function onStart() {
            // ensure start only got called once
            if (!called) { cb(); }
            called = true;
     }).on('restart', function onRestart() {
        var times =0 ;
       var loop =  setInterval(function(){
           bs.notify('正在重新启动!');
            portscanner.checkPortStatus(3000, '127.0.0.1', function(error, status) {

                if(status=='open'){
                    bs.reload();
                    clearInterval(loop);
                }
                // Status is 'open' if currently in use or 'closed' if available
                times++ ;
                if(times==10){
                    clearInterval(loop);
                }
            })
        },1000);
     });
});


gulp.task('browser-sync', ['nodemon'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    bs.init({

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000

        // open the proxied app in chrome
        // browser: ['google-chrome']
    });
});

gulp.task('develop',['browser-sync'], function () {


  // livereload.listen();
  // nodemon({
  //   script: 'app.js',
  //   ext: 'js coffee handlebars dust',
  //   stdout: false
  // }).on('readable', function () {
  //   this.stdout.on('data', function (chunk) {
  //     if(/^Express server listening on port/.test(chunk)){
  //       livereload.changed(__dirname);
  //     }
  //   });
  //   this.stdout.pipe(process.stdout);
  //   this.stderr.pipe(process.stderr);
  // });
  //
  //   var started = false ;
  //  return  nodemon({
  //       script: 'app.js',
  //       ext: 'js coffee handlebars dust',
  //       stdout: false
  //   }).on('start',function(){
  //
  //  });
});


gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
