const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    miniCssExtractPlugin.loader, 
                    "css-loader", 
                    "sass-loader",
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin(), 
        new htmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'main.js',
        clean: true,
    },
    devtool: "source-map",
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true, 
        port: 9000,
        hot: true,
    },
}