const path = require('path')
const DemoWebpackPlugin = require('./plugin/index')
module.exports = {
  mode: 'development',
  entry: {
    main: './src/loader.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: '[name].js',
  },
  resolveLoader: {
    // loader路径查找顺序从左往右
    modules: ['node_modules', './'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'syncloader',
            options: {
              message: '我是option传过去',
            },
          },
          {
            loader: 'asyncloader',
          },
        ],
      },
    ],
  },
  plugins: [new DemoWebpackPlugin()],
}
