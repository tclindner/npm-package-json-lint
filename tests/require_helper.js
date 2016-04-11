module.exports = function (path) {
  return require((process.env.SRC_DIR_FOR_CODE_COVERAGE || '../src/') + path);
};
