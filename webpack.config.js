const path = require('path');

module.exports = {
  mode: 'development', // or 'production' as per your requirement
  entry: './src/main.ts', // The path to your main TypeScript file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // The name of the output bundle
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
