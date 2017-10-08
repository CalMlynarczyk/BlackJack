module.exports = {
    entry: "./ui.js",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: "eval-source-map",
    output: {
        filename: "bundle.js"
    }
};
