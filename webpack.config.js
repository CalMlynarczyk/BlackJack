const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.argv.indexOf("-p") !== -1;

module.exports = {
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
    images: glob.sync(path.resolve(__dirname, "Vector-Playing-Cards/cards-svg/**/*.*")),
    audio: glob.sync(path.resolve(__dirname, "audio/**/*.wav")),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "awesome-typescript-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: "",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
