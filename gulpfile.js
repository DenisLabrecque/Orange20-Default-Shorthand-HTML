import del from 'del'
import gulp from 'gulp'
import minify from 'gulp-terser'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'

const server = browserSync.create();

const source = {
   js: 'elements/*.js',
   html: 'elements/*.html',
   common: 'elements/common/*.js'
}
const dest = {
   elements: 'dist/elements/',
   common: 'dist/elements/common/'
}

const clean = () => del(['dist']);

function scripts() {
   return gulp.src(source.js, { sourcemaps: true })
      .pipe(babel())
      .pipe(minify())
      .pipe(gulp.dest(dest.elements))
}

function commonScripts() {
   return gulp.src(source.common, { sourcemaps: true })
      .pipe(babel())
      .pipe(minify())
      .pipe(gulp.dest(dest.common))
}

function html() {
   return gulp.src(source.html)
      .pipe(gulp.dest(dest.elements))
}

function reload(done) {
   server.reload();
   done();
}

function serve(done) {
   server.init({
      server: {
         baseDir: './'
      }
   });
   done();
}

const watch = () => gulp.watch([source.js, source.html, source.common, 'tester.html', 'index.html'], gulp.series(reload));

const dev = gulp.series(clean, html, scripts, commonScripts, serve, watch);
export default dev;