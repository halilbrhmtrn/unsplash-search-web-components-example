const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = ({mode}) => {
  return {
    mode: 'development',
    entry: {
      main: ["regenerator-runtime/runtime.js", "./src/index.js"],
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].bundle.js",
    },
    target: "web", 
    devtool: 'eval',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      publicPath: "/",
      open: true,
      port:3000,
      hot: false,
      liveReload: true,
      historyApiFallback: true, // routing
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              sourceMaps: 'inline',
            },
          },
        },
        {
          test: /\.html$/i,
          use: ["raw-loader"],
        },
        {
          test: /\.css$/i,
          use: ["raw-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          { from: "src/styles.css", to: "styles.css" },
          { from: "src/index.css", to: "index.css" },
          { from: "src/reset.css", to: "reset.css" },
        ],
      }),
    ],
    optimization: {
      minimize: mode === "production",
    },
  };
};
