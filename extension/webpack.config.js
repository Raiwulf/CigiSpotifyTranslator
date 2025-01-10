const path = require('path');

module.exports = {
  entry: './src/content.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
    usedExports: true,
  },
  performance: {
    hints: false,
  }
}; 