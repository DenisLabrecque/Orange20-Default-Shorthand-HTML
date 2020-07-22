import del from 'del'
import gulp from 'gulp'
import browserSync from 'browser-sync'

const server = browserSync.create();

const paths = {
   scripts: {
      src: 'elements/*.js',
      dest: 'dist/elements/'
   },
   html: {
      src: 'elements/*.html',
      tester: 'tester.html',
      dest: 'dist/elements/'
   }
};

const clean = () => del(['dist']);

function scripts() {
   return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(gulp.dest(paths.scripts.dest));
}

function html() {
   return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest))
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

const watch = () => gulp.watch([paths.scripts.src, paths.html.src, paths.html.tester], gulp.series(scripts, reload));

const dev = gulp.series(clean, html, scripts, serve, watch);
export default dev;