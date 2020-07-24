import del from 'del'
import gulp from 'gulp'
import minify from 'gulp-terser'
import babel from 'gulp-babel'
import browserSync from 'browser-sync'

const server = browserSync.create();

const paths = {
   
   scripts: {
      src: 'elements/*.js',
      dest: 'dist/elements/',
      common: 'elements/common/*.js'
   },
   html: {
      src: 'elements/*.html',
      tester: 'tester.html',
      dest: 'dist/elements/'
   }
};

const source = {
   elements: ['elements/*.js', 'elements/*.html'],
   common: 'elements/common/*.js'
}
const dest = {
   elements: 'dist/elements',
   common: 'dist/elements/common'
}

const clean = () => del(['dist']);

function scripts() {
   return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(babel())
      .pipe(minify())
      .pipe(gulp.dest(paths.scripts.dest))
}

function commonScripts() {
   return gulp.src('elements/common/*.js', { sourcemaps: true })
      .pipe(babel())
      .pipe(minify())
      .pipe(gulp.dest('dist/elements/common/'))
}

function html() {
   return gulp.src(paths.html.src)
      .pipe(gulp.dest(paths.scripts.dest))
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

const watch = () => gulp.watch([paths.scripts.src, paths.scripts.common, paths.html.src, 'tester.html', 'index.html'], gulp.series(scripts, reload));

const dev = gulp.series(clean, html, scripts, commonScripts, serve, watch);
export default dev;