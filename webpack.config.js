module.exports = {
  mode: 'development',
  entry: {
    'babel-polyfill': 'babel-polyfill',
    'main': './src/index.js',
  },
  output: {
    path: `${__dirname}/dest/`,
    filename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};