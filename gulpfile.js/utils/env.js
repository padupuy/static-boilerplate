function isProductionMode() {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  isProductionMode: isProductionMode
};
