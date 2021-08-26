const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-source-map',
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
        // 每次构建都清理上path对于目录，以前必须使用CleanPlugin
        clean: true,
        // 打包libray库时需要
        // library: 'MyLibrary' 
    },
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
                        loader: 'style-loader',
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
                    // presets: ['@babel/preset-env'],
                    presets: ['@babel/preset-env','@vue/babel-preset-jsx'],
                  }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            title: 'webpack externals',
        }),
    ],
    externals: {
        vue: 'Vue', // 全局变量运行环境：外部模块通过全局变量Vue进行访问
        // vue: 'commonjs vue', // commonjs运行环境：外部模块通过commonjs进行访问
    },
    target: 'web',
    // target: 'node',
}