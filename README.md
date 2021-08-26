# webpack-guide（webpack基础学习指南）

**本项目为webpack基础学习源码，当前webpack版本为webpack5，本次源码包含以下内容：**
* entry
* output
* loader
* plugin
* mode
* resolve
* devtool
* devServer
* externals
* optimization

**为方便保存webpack.config.js，封装了cli.js,提供bpack指令，实用如下：**
```
1、npm link
2、开发环境：bpack --config=plugin --server // 其中plugin指定学习内容目录名称，可以是源码目录中的任何目录名称
3、生产环境 bpack --config=plugin
```