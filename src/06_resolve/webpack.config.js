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
        // publicPath: '/',
        // 每次构建都清理上path对于目录，以前必须使用CleanPlugin
        clean: true,
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
    ],
    resolve: {
        // 配置别名
        alias: {
            '@': path.resolve(__dirname, '../../src'),
            'utils': path.resolve(__dirname, './utils.js'),
        },
        // 当引入模块没有拓展名时配置解析顺序
        extensions: ['.js', '.json', '.wasm'],
        // 加载npm模块是优先使用module字段对应的js文件(通常是es2015模块)
        mainFields: ['module', 'main'],
        // import一个目录时，会依次从下列数组中查询目录下文件名称
        mainFiles: ['index'],
    }
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