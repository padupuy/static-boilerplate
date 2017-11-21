const requireDir = require('require-dir');

// Load all gulp tasks
requireDir('./tasks', { recurse: true });
