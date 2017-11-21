module.exports = {
  extends: ['unobtrusive', 'unobtrusive/import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  }
};
