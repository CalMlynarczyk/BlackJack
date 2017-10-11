const prod = process.argv.indexOf("-p") !== -1;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: prod
                    ? ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            { loader: "css-loader", options: { importLoaders: 1 } },
                            "postcss-loader"
                        ]
                    })
                    : [
                        "style-loader", 
                        { loader: "css-loader", options: { importLoaders: 1 } }, 
                        "postcss-loader"
                    ]
            }
        ]
    },
    devtool: prod ? "source-map" : "eval-source-map",
    output: {
        filename: "./dist/bundle.js"
    },
    plugins: [
        new ExtractTextPlugin("./dist/style.css")
    ]
};
