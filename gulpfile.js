let gulp = require('gulp')
let browserSync = require('browser-sync').create()

// Static server
gulp.task('browser-sync', function () {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
});