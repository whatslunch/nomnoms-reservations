const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname + '/client/index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist')
  },
  module: {
    rules: [
      //{
        //enforce: 'pre',
        //test: /\.jsx?/,
        //exclude: /node_modules/,
        //loader: 'eslint-loader',
      //},
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env', 'babel-preset-airbnb']
        }
      }
    ]
  }
};
