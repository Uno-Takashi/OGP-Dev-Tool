const rspack = require('@rspack/core');
const path = require('path');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
  experiments: {
    css: true,
  },
  entry: {
    popup: path.join(srcDir, 'presentation', 'pages', 'Popup.tsx'),
    options: path.join(srcDir, 'presentation', 'pages', 'Options.tsx'),
    background: path.join(srcDir, 'chrome', 'background.ts'),
    content_script: path.join(srcDir, 'chrome', 'content_script.tsx'),
    devtools_page: path.join(srcDir, 'chrome', 'devtools_page.tsx'),
    devtools_panel: path.join(srcDir, 'presentation', 'pages', 'DevToolsPanel.tsx'),
    preview: path.join(srcDir, 'presentation', 'pages', 'Preview.tsx'),
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 5000,
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['sass-loader'],
        type: 'css/auto',
      },
      {
        test: /\.css$/i,
        use: ['postcss-loader'],
        type: 'css/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      querystring: 'querystring-es3',
    },
    fallback: {
      process: require.resolve('process/browser.js'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new rspack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new rspack.CopyRspackPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
    }),
  ],
};
