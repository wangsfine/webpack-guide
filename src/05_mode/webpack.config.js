const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');

const webpackConfig = {
    // 字符串路径
    entry: path.resolve(__dirname, './index.js'),
    output: {
        // 指定输出路径
        path: path.resolve(__dirname, '../../dist'),
        // 指定资源名称
        filename: '[name].[contenthash].js',
        // 指定静态资源名称
        assetModuleFilename: '[name].[contenthash][ext]',
        // 按需要加载的资源
        chunkFilename: 'dynamic.[name].[contenthash].js',
        // 发布路径
        // publicPath: '/',
        // 每次构建都清理上path对于目录，以前必须使用CleanPlugin
        clean: true,
        // 打包libray库时需要
        // library: 'MyLibrary' 
    },
    mode: process.env.NODE_ENV, // none | development | production
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
            {
                test: /\.(less|css)$/i,
                use: [
                    {
                        loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack mode'
        }),
        // 注入自定义变量
        new webpack.DefinePlugin({
            'process.env.APP_VERSION': JSON.stringify('ankorstor_v3.1.1.0.10.0'),
        }),
        // 其他地方不用引入jquery即可直接使用
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ]
}

// 生产环境抽离css为独立文件
if (process.env.NODE_ENV === 'production') {
    webpackConfig.plugins.push(
        // 将css抽离为独立文件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        })
    )
}

module.exports = webpackConfig;