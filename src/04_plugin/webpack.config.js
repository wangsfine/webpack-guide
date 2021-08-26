const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');


module.exports = {
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
    mode: 'production', // none | development | production
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
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // {
                    //     loader: 'style-loader',
                    // },
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
            template: path.resolve(__dirname, './index.html'),
        }),
        // 注入自定义变量
        new webpack.DefinePlugin({
            'process.env.APP_VERSION': JSON.stringify('ankorstor_v3.1.1.0.10.0'),
        }),
        // 注入自定义banner
        new webpack.BannerPlugin({
            banner: 'created by wangzhibing'
        }),
        // 添加进度显示
        new webpack.ProgressPlugin({
            handler(percentage, message, ...args) {
                console.info(`${Number(percentage * 100).toFixed(2)}%`, message, ...args);
            },
        }),
        // 打包出错后禁止emit资源
        new webpack.NoEmitOnErrorsPlugin(),
        // 其他地方不用引入jquery即可直接使用
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        // 将css抽离为独立文件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        // 提前做gzip压缩，可供服务端直接使用
        // new CompressionPlugin({
        //     algorithm: "gzip",
        // }),
        // 将不需要打包的静态资源进行copy
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../../public'), to: path.resolve(__dirname, '../../dist') },
            ],
        }),
    ]
}