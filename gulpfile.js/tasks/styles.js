const gulp = require('gulp');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const reporter = require('postcss-reporter');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const stylelint = require('stylelint');

const { handleErrors } = require('../utils/errors');
const { isProductionMode } = require('../utils/env');
const { config } = require('../../config');

const stylelintConfig = {
  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'string-quotes': 'single'
  }
};

let plugins = [
  stylelint(stylelintConfig),
  require('postcss-import'),
  require('postcss-object-fit-images'),
  require('postcss-cssnext')()
];

if (isProductionMode()) {
  plugins.push(cssnano({ preset: 'default', autoprefixer: false }));
}

plugins.push(reporter({ clearMessages: true }));

function stylesTask() {
  return gulp
    .src(`${config.src}/${config.styles.src}/${config.styles.name}`)
    .pipe(gulpif(!isProductionMode(), sourcemaps.init()))
    .on('error', handleErrors)
    .pipe(postcss(plugins))
    .on('error', handleErrors)
    .pipe(gulpif(!isProductionMode(), sourcemaps.write()))
    .pipe(gulp.dest(`${config.dest}/${config.styles.dest}`))
    .pipe(browserSync.stream());
}

gulp.task('styles', stylesTask);
module.exports = stylesTask;
