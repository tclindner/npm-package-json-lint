module.exports = {
  parseForESLint(code, {filePath}) {
    // We don't have JS, so this AST is for empty JS file
    return {
      ast: {
        type: 'Program',
        start: 0,
        end: 0,
        loc: {start: {line: 1, column: 0}, end: {line: 1, column: 0}},
        range: [0, 0],
        body: [],
        tokens: [],
        comments: [],
      },
      services: {
        getPackageJson: () => code,
        getPath: () => filePath,
      },
    };
  },
};
