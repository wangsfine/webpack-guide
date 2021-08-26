const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                    presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
                  }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
        }),
        // 将css抽离为独立文件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        // 将不需要打包的静态资源进行copy
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../../public'), to: path.resolve(__dirname, '../../dist') },
            ],
        }),
        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        // 提取引导模板
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        // 压缩插件
        minimizer: [
            '...', // 继承webpack内置压缩优化
            new CssMinimizerPlugin(), // 压缩css
            // new TerserPlugin(), // 压缩及tree-shaking js
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                verdors: {
                  name: 'vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  reuseExistingChunk: true,
                },
                main: {
                  name: 'main',
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true,
                },
                utils: {
                    chunks: 'initial',
                    name: 'utils',
                    test: path.resolve(__dirname, './utils'),
                    minChunks: 1,
                    minSize: 1,
                    priority: 5,
                    reuseExistingChunk: false,
                },
                components: {
                    name: 'components',
                    test: path.resolve(__dirname, './components'),
                    minChunks: 1,
                    minSize: 1,
                    priority: 5,
                    reuseExistingChunk: true,
                }
            },
        }
    }
}