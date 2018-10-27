const isProd = process.argv.indexOf("-p") !== -1;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
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
    ],
  },
  output: {
    filename: "./dist/bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./dist/style.css",
    }),
  ],
};
