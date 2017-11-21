const gulp = require('gulp');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');
const eslint = require('rollup-plugin-eslint');
const browserSync = require('browser-sync');

const { handleErrors } = require('../utils/errors');
const { isProductionMode } = require('../utils/env');
const { config } = require('../../config');

let plugins = [
  eslint({
    throwOnWarning: false,
    throwOnError: false
  }),
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    exclude: 'node_modules/**'
  })
];

if (isProductionMode()) {
  plugins.push(uglify());
}

const options = {
  input: `${config.src}/${config.scripts.src}/${config.scripts.name}`,
  plugins: plugins,
  onwarn: function({ code, loc, frame, message }) {
    //avoid log error from module
    if (code === 'THIS_IS_UNDEFINED') {
      return;
    }
    handleErrors(new Error({ loc, frame, message }), false);
  }
};

async function scriptsTask() {
  const bundle = await rollup.rollup(options);

  await bundle
    .write({
      file: `${config.dest}/${config.scripts.dest}/${config.scripts.name}`,
      format: 'iife',
      name: 'main',
      sourcemap: !isProductionMode()
    })
    .then(function() {
      return browserSync.reload();
    })
    .catch(function(e) {
      throw e;
    });
}

gulp.task('scripts', scriptsTask);
module.exports = scriptsTask;
