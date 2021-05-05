var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    output: {
        publicPath: '/'
    },
    devServer: {
        publicPath: '/',
        historyApiFallback: true,
    },
    watchOptions: {
        ignored: /node_modules/
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: "http://127.0.0.1:8000",
        }),
    },
};
