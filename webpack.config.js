const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const settings = {
  distPath: path.join(__dirname, 'build'),
  srcPath: path.join(__dirname, 'src'),
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath);
}

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  return {
    entry: {
      index: srcPathExtend('index.js'),
    },
    output: {
      path: settings.distPath,
      filename: 'playthem-widget.min.js',
      publicPath: '/',
    },
    devtool: isDevMode ? 'source-map' : false,
    resolve: {
      modules: ['node_modules', 'src/js', 'src'],
      extensions: ['.js', '.jsx', '.scss'],
    },
    performance: {
      hints: false,
    },
    module: {
      unsafeCache: true,
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: ['babel-loader'],
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevMode,
                importLoaders: isDevMode ? 1 : 2,
                modules: {
                  localIdentName: '[local]',
                },
              },
            },
            { loader: 'postcss-loader', options: { sourceMap: isDevMode } },
            { loader: 'sass-loader', options: { sourceMap: isDevMode } },
          ],
        },
  
        // Images: Copy image files to build folder
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp|)$/i,
          type: 'asset/resource',
          generator: {
            // filename: 'images/',
            outputPath: 'images',
          },
        },
  
        // Fonts and SVGs: Inline files
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/resource',
          generator: {
            // filename: 'fonts/',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    devServer: {
      static: '/',
      historyApiFallback: true,
      compress: true,
      port: 3000,
    },
    optimization: {
      // concatenateModules: false,
      minimize: false,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ['PTW', 'PTW_STORAGE'],
              keep_fnames: true,
              keep_classnames: true,
            },
            output: {
              comments: false, // удаляет комментарии
            },
          },
        }),
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        template: srcPathExtend('index.html'),
        favicon: srcPathExtend('favicon.ico'),
      }),
    ],
  };
};
