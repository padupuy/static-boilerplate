const notify = require('gulp-notify');

function handleErrors(errorObject, stop = true) {
  notify
    .onError(
      errorObject
        .toString()
        .split(': ')
        .join(':\n')
    )
    .apply(this, arguments);

  if (stop) {
    // Keep gulp from hanging on this task
    if (typeof this.emit === 'function') {
      this.emit('end');
    }
  }
}

module.exports = {
  handleErrors: handleErrors
};
