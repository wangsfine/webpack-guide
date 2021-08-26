#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const webpack = require('webpack');

const { config: configFlag, server, port = 3000 } = argv;
// 设置环境变量
process.env.NODE_ENV = server ? 'development' : 'production';

const configPath = getConfigPath(configFlag);
const config = require(configPath);
const compiler = webpack(config);
if (server) {
    const options = {
        static: path.resolve(__dirname, './dist'),
        hot: true,
        host: '0.0.0.0',
        port,
    }
    const { devServer = options } = config;
    // webpack dev server
    const WebpackDevServer = require('webpack-dev-server');
    const server = new WebpackDevServer(compiler, devServer);
    const { port: devPort } = devServer
    server.listen(devPort, 'localhost', () => {
        console.log(`dev server listening on port ${devPort}`);
    })
} else {
    compiler.run((err, stats) => {
        if (err) {
            console.log(err);
        }
        if (stats.hasErrors()) {
            console.error(stats.compilation.errors)
        }
        // if (stats.hasWarnings()) {
        //     console.warn(stats.compilation.warnings)
        // }
        compiler.close((closeErr) => {
            // ...
        });
    })
}




/**
 * 获取configFlag指定的src下的目录
 * @param {*} configFlag 
 * @returns 
 */
function getConfigPath(configFlag) {
    const dirs = fs.readdirSync(path.resolve('./src'), { withFileTypes: true});
    const names = dirs.map(dir => dir.name);
    const dir = names.find(name => new RegExp(`${configFlag}`).test(name))
    return path.resolve(__dirname, `./src/${dir}/webpack.config.js`);
}

