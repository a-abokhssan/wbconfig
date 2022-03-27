const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader'

const config = {
  entry: {
    index: './src/main/main.js',
    'pets/pets': './src/pets/pets.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    open: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/main/main.html',
      minify: false,
      inject: 'body',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'pets/index.html',
      template: './src/pets/pets.html',
      minify: false,
      inject: 'body',
      chunks: ['pets/pets'],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        //include: path.resolve(__dirname, 'src/html/'),
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
    )
  } else {
    config.mode = 'development'
  }
  return config
}
