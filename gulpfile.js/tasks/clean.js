const gulp = require('gulp');
const del = require('del');

const { config } = require('../../config');

function cleanTask() {
  return del(`${config.dest}/**/*`, { force: true });
}

gulp.task('clean', cleanTask);
module.exports = cleanTask;
