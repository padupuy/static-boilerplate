window.onerror = function(message, filename, lineno, colno, error) {
  console.log('window.onerror ERROR', message, filename, lineno, colno, error);
};

window.addEventListener('unhandledrejection', event => {
  event.preventDefault();
  console.log('unhandledrejection ERROR: ' + event.reason);
});

window.addEventListener('rejectionhandled', event => {
  console.log('rejectionhandled ERROR: ', event);
});
