const path = require('path');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');

const { config } = require('../../config');

gulp.task('default', ['watch']);
gulp.task('watch', ['clean', 'html', 'styles', 'scripts'], () => {
  browserSync({
    server: {
      baseDir: config.dest
    }
  });

  gulp.watch(`${config.src}/${config.styles.src}/**/*.css`, ['styles']);
  gulp.watch(`${config.src}/${config.scripts.src}/**/*.js`, ['scripts']);
  gulp.watch(`${config.src}/${config.html.src}/**/*.html`, ['html']);
});

gulp.task('build', function() {
  runSequence('clean', 'html', 'styles', 'scripts');
});
