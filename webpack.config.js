const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development', // or 'production' or 'none'
  entry: './src/main.ts', // Entry point of your application
  output: {
    path: __dirname + '/dist', // Output directory for the build artifacts
    filename: 'bundle.js', // Output bundle file name
  },
  module: {
    rules: [
      // Define your Webpack loaders for different file types (e.g., TypeScript, CSS, etc.)
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Add more loaders for CSS, images, etc. as needed
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // Add the BundleAnalyzerPlugin to your plugins array
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generate a static HTML report file
      reportFilename: 'bundle-report.html', // Output report file name
    }),
  ],
};
