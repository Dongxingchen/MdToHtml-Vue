var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require("webpack")

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(ttf|png|jpg|jpeg|gif|woff|woff2|eot|otf)$/,
                loader: 'url-loader'
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ]
}