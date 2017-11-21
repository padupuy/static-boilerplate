const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const nunjucksRender = require('gulp-nunjucks-render');

const { handleErrors } = require('../utils/errors');
const { isProductionMode } = require('../utils/env');
const { config } = require('../../config');

const excludeForlders = ['layouts', 'shared', 'macros', 'data'];

function htmlTask() {
  return gulp
    .src([
      `${config.src}/${config.html.src}/**/*.html`,
      `!${config.src}/${config.html.src}/**/{${excludeForlders.join(',')}}/**`
    ])
    .on('error', handleErrors)
    .pipe(
      nunjucksRender({
        path: [path.resolve(process.env.PWD, config.src, config.html.src)],
        data: {
          css_path: `/${config.styles.dest}/${config.styles.name}`,
          js_path: `/${config.scripts.dest}/${config.scripts.name}`
        }
      })
    )
    .on('error', handleErrors)
    .pipe(gulpif(isProductionMode(), htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
}

gulp.task('html', htmlTask);
module.exports = htmlTask;
