const path = require('path');

module.exports = {
    // 字符串路径
    // entry: path.resolve(__dirname, './index.js'),
    // 字符串路径数组
    // entry: [path.resolve(__dirname, './index.js'), path.resolve(__dirname, './index2.js')],
    entry: {
        // math: path.resolve(__dirname, './math.js'),
        // 抽离公共库为单独文件
        venders: ['lodash', 'moment', path.resolve(__dirname, './math.js')],
        index2: path.resolve(__dirname, './index2.js'),
        index: {
            import: path.resolve(__dirname, './index.js'),
            dependOn: 'venders',
            filename: 'page/main.[contenthash].js', // 入口指定output文件名称
        }
        
    },
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
        publicPath: '.',
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
        ]
    }
}