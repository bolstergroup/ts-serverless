const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  target: 'node',
  mode: 'development',
  optimization: {
    minimize: true
  },
  performance: {
    hints: false
  },
  devtool: 'nosources-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              babelCore: '@babel/core'
            }
          }
        ]
      }
    ]
  },
  plugins: [new CheckerPlugin()],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  }
}
