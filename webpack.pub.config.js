const path = require('path');
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [
                    { loader: "vue-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //  {
            //     test: /\.css$/,
            //     loader: "style-loader!css-loader"
            // },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader?limit=4000&name=images/[name]-[hash:5].[ext]'
                }]
            },
            {
                test: /\.(ttf|woff)$/,
                use: [{
                    loader: 'url-loader?limit=4000&name=fonts/[name]-[hash:5].[ext]'
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template: './template.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"' //设置为生产环境
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false //干掉警告
            },
            comments: false //去掉版权信息等注释
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })
    ]
}