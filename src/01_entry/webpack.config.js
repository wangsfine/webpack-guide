const path = require('path');

module.exports = {
    // 字符串路径
    // entry: path.resolve(__dirname, './index.js'),
    // 字符串路径数组
    // entry: [path.resolve(__dirname, './index.js'), path.resolve(__dirname, './index2.js')],
    entry: {
        // math: path.resolve(__dirname, './math.js'),
        venders: ['lodash', 'moment', path.resolve(__dirname, './math.js')],
        index2: path.resolve(__dirname, './index2.js'),
        index: {
            import: path.resolve(__dirname, './index.js'),
            dependOn: 'venders',
            filename: 'page/main.js',
        }
        
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js',
        clean: true,
    }
}